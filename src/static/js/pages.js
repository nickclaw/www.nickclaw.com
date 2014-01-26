var object = {
	"container": {
		"url": "",
		"classes": "vertical",
		"nav": "vertical",

		"children": {
			"home": {
				"url": "",
				"classes": "horizontal main page",
				"title": "home",

				"children": {
					"main": {
						"url": "",
						"title": "nickclaw",
						"classes": "page sub"
					}
				}
			},

			"about": {
				"url": "about",
				"classes": "horizontal main page",
				"title": "about",
				
				"children": {
					"main": {
						"url": "",
						"title": "about",
						"classes": "page sub"
					},
					"me": {
						"url": "me",
						"title": "me",
						"classes": "page sub"
					},
					"now": {
						"url": "now",
						"title": "now",
						"classes": "page sub"
					}
				}
			},

			"experience": {
				"url": "experience",
				"classes": "horizontal main page",
				"title": "experience",

				"children": {
					"main": {
						"url": "",
						"title": "experience",
						"classes": "page sub"
					},
					"biology": {
						"url": "biology",
						"title": "biology",
						"classes": "page sub"
					},
					"ecocar": {
						"url": "ecocar",
						"title": "ecocar",
						"classes": "page sub"
					}
				}
			},

			"projects": {
				"url": "projects",
				"classes": "horizontal main page",
				"title": "projects",

				"children": {
					"main": {
						"url": "",
						"title": "projects",
						"classes": "page sub"
					},
					"sockdraw": {
						"url": "sockdraw",
						"title": "sockdraw",
						"classes": "page sub"
					},
					"window-tiler": {
						"url": "window-tiler",
						"title": "window tiler",
						"classes": "page sub"
					},
					"gccui": {
						"url": "gccui",
						"title": "gccUI",
						"classes": "page sub"
					},
					"get-lost": {
						"url": "get-lost",
						"title": "get lost",
						"classes": "page sub"
					}
				}
			},

			"contact": {
				"url": "contact",
				"classes": "horizontal main page",
				"title": "contact",
				
				"children": {
					"main": {
						"url": "",
						"title": "contact",
						"classes": "page sub"
					}
				}
			}
		}
	}
};

if (typeof window !== 'undefined') window.pages = object;
if (typeof module !== 'undefined') module.exports.children = object;