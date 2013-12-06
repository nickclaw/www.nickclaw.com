var express = require('express'),
	swig = require('swig'),
	pages = require('./pages.js');

var app = express();

// swig stuff
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view_cache', false);
swig.setDefaults({ cache: false });
swig.setFilter('shift', function(input) {
	return input.slice(1);
});
swig.setFilter('length', function(input) {
	return input.length;
});
swig.setFilter('pathify', function(value, add) {
	if (add || !value) {
		return value + '/' + add;
	} else {
		return value;
	}
});

// serve static content
app.use(express.compress());
app.use('/static', express.static(__dirname + '/static'));

function getPath(path) {
	var paths = path.split('/');
	paths[0] = 'container';
	paths[1] = paths[1] || 'home';
	paths[2] = paths[2] || 'main';
	paths[2] = paths[1]+ '-' + paths[2];
	return paths;
}

app.get("*", function(req, res) {
	var path = getPath(req.path);
	res.render('template', {
		'layout': pages,
		'path': path
	});
});

app.post("*", function(req, res) {
	var path = getPath(req.path);
	res.render('pages/'+path[2]+'.html');
});

app.listen(8080);
console.log('listening on port 8080');
console.log('current directory:' + __dirname);