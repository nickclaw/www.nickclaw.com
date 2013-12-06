# backup old build
rm -rf ./~build
mv ./build ./~build

#create needed build directories
mkdir -p -v ./build/static/{css,image,js}
mkdir -p -v ./build/views/pages

#compile scss files
sass --scss --style compressed  ./src/static/css/noscript.scss ./build/static/css/noscript.css
sass --scss --style compressed  ./src/static/css/main.scss ./build/static/css/main.css

#copy some files
cp -R ./src/.htaccess ./src/node_modules ./src/server.js ./src/package.json ./build/
cp -R ./src/views/pages ./build/views/pages

#concatenate all my js files to temporary file
cat $( ls -S ./src/static/js/*.js ) > ./build/static/js/.script.js
	
#compile and minimize javascript
in=./build/static/js/.script.js
out=./build/static/js/..script.js
curl -s \
	-d compilation_level=ADVANCED_OPTIMIZATIONS \
	-d output_format=text \
	-d externs_url="https://closure-compiler.googlecode.com/git/contrib/externs/jquery-1.9.js"\
	-d output_info=compiled_code \
	--data-urlencode "js_code@${in}" \
	http://closure-compiler.appspot.com/compile \
	> $out

# concatenate that with external scripts
cat $(ls -S ./src/static/js/external/*.js) ./build/static/js/..script.js > ./build/static/js/script.js

#remove temporary script file
rm ./build/static/js/.script.js ./build/static/js/..script.js

# make index.html link to compiled script
sed -e "s/<!--COMPILE-->.*<!--ENDCOMPILE-->/<script src=\"\/static\/js\/script\.js\"><\/script>/g" -e "s/\.gif\.png/\.gif/g" ./src/views/template.html > ./build/views/template.html

# copy images over
cp -R ./src/static/image ./build/static

# convert and compress images
cd build
	
	#pngs
	for f in `find . -name "*.png"`
	do
	    convert $f -fuzz 10% -transparent none -strip $f
	done
		
	#jpgs
	for f in `find . -name "*.jpg"`
	do
	    convert $f -quality 60 -resize 66% -strip $f
	done

	#remove illustrator files
	for f in `find . -name "*.ai"`
	do
		rm $f
	done
cd ..
