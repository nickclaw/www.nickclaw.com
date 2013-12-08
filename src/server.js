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
	try {
		return Object.keys(input).length;
	} catch (e) {
		return -1;
	}
});
swig.setFilter('joinify', function(value, add, glue) {
	return value + (value && add?glue:'') + add;
});

// serve static content
app.use(express.compress());
app.use('/static', express.static(__dirname + '/static'));

// accept post data
app.use(express.bodyParser());

function checkPath(path) {
	var current = pages.children;
	for (var i = 0; i < path.length; i++) {
		if (current[path[i]]) {
			current = current[path[i]].children;
		} else {
			return false;
		}
	}
	return true;
}

app.get("/", function(req, res) {
	var path = ["container", "home", "main"];
	if (checkPath(path)) {
		res.render('template', {
			'mainLayout': pages,
			'path': ["container", "home", "main"]
		});
	} else {
		res.send(404);
	}
});

app.get("/:main", function(req, res) {
	console.log(pages);
	console.log(' ');
	var path = ["container", req.params.main, "main"];
	if (checkPath(path)) {
		res.render('template', {
			'mainLayout': pages,
			'path': ["container", req.params.main, "main"]
		});
	} else {
		res.send(404);
	}
});

app.get("/:main/:sub", function(req, res) {
	var path = ["container", req.params.main, req.params.sub];
	if (checkPath(path)) {
		res.render('template', {
			'mainLayout': pages,
			'path': ["container", req.params.main, req.params.sub]
		});
	} else {
		res.send(404);
	}
});

app.post("/get", function(req, res) {
	var path = req.body.path.split('_');
	if (checkPath(path)) {
		if (path.length === 3) {
			res.render(path.join('/'));
		} else if (path.length === 2) {
			console.log(pages.children[path[0]].children[path[1]]);
			console.log(" ");
			res.render('main_page', {
				'mainLayout': pages.children[path[0]].children[path[1]],
				'u': pages.children[path[0]].children[path[1]].url,
				'i': path[0]+'_'+path[1],
				'path': []
			});
		}
	} else {
		res.send(404);
	}
});

app.listen(8080);
console.log('listening on port 8080');
console.log('current directory:' + __dirname);