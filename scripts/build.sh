# build files src
rm -r build/
cp -r src build
./node_modules/.bin/babel --out-dir build src

# build assets
mkdir -p build/assets
cp -r src/static/* build/assets/
./node_modules/.bin/webpack --config ./webpack.prod.config.js
