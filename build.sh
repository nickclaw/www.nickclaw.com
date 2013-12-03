# backup old build
rm -rf ./~build
mv ./build ./~build

#create needed build directories
mkdir -p -v ./build/static/{css,image,js}

#compile scss files
sass --scss --style compressed  ./src/static/css/noscript.scss ./build/static/css/noscript.css
sass --scss --style compressed  ./src/static/css/main.scss ./build/static/css/main.css

#copy .htaccess and index.html
cp ./src/.htaccess ./src/index.html ./build/

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
sed -e "s/<!--COMPILE-->.*<!--ENDCOMPILE-->/<script src=\"\/static\/js\/script\.js\"><\/script>/g" -e "s/\.gif\.png/\.gif/g" ./build/index.html > ./build/.index.html
rm ./build/index.html;
mv ./build/.index.html ./build/index.html


# copy images over
cp -R ./src/static/image ./build/static

# convert and compress pngs
cd build
for f in `find . -name "*.png"`
do
    convert $f -fuzz 10% -transparent none -strip $f
done
	
#convert and compress jpgs
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

#gzip all css js and html
for f in `find ./build -name "*.css" -o -name "*.html" -o -name "*.js"`
do 
	gzip -c -9 $f > $f"gz"
done
