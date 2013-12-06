var express = require('express'),
	swig = require('swig'),
	pages = {
		"id": "#container",
		"url": "",
		"title": "",
		"classes": "vertical",
		"nav": "vertical",

		"children": [
			{	
				"id":"#home",
				"url":"",
				"title": "home",
				"classes": "horizontal page main",
				"nav": "horizontal",

				"children": [
					{	
						"id": "#home-main",
						"url": "",
						"title": "nickclaw",
						"classes": "page sub"
					}
				]

			},
			{	
				"id":"#about",
				"url":"about",
				"title": "about",
				"classes": "horizontal page main",
				"nav": "horizontal",

				"children": [
					{	
						"id": "#about-main",
						"url": "",
						"title": "about",
						"classes": "page sub"
					},
					{	
						"id": "#about-more",
						"url": "more",
						"title": "more",
						"classes": "page sub"
					},
					{	
						"id": "#about-experience",
						"url": "experience",
						"title": "experience",
						"classes": "page sub"
					}
				]
			},
			{	
				"id":"#projects",
				"url":"projects",
				"title": "projects",
				"classes": "horizontal page main",
				"nav": "horizontal",


				"children": [
					{	
						"id": "#projects-main",
						"url": "",
						"title": "projects",
						"classes": "page sub"
					},
					{	
						"id": "#projects-ecocar",
						"url": "ecocar",
						"title": "ecocar",
						"classes": "page sub"
					},
					{	
						"id": "#projects-biology",
						"url": "biology",
					 	"title":"biology",
					 	"classes": "page sub"
					},
					{	
						"id": "#projects-window-tiler",
						"url": "window-tiler",
						"title": "tiler",
						"classes": "page sub"
					},
					{	
						"id": "#projects-get-lost",
						"url": "get-lost",
						"title": "get lost",
						"classes": "page sub"
					}
				]
			},
			{	
				
				"id":"#contact",
				"url":"contact",
				"title": "contact",
				"classes": "horizontal page main",
				"nav": "horizontal",

				"children": [
					{	
						"id": "#contact-main",
						"url": "",
						"title": "contact",
						"classes": "page sub"
					}
				]
			}
		]
	};

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
	console.log(paths);
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