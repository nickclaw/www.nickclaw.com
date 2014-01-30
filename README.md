www.nickclaw.com
================

All the code behind [www.nickclaw.com](http://www.nickclaw.com).

1) Running this site
--------------------------------

#### Requirements
 * node.js ~0.10.22
 * npm ~1.3.15
 * root access (optional)
 
#### Setup
 * Install dependencies with npm

    npm install
    
 * Build static content
 
    gulp
    
 * Start server
 
    npm start
    
If you have root access and can call `sudo`, you can make this node instance listen directly to port 80 by changing the port in `server.js` to `80` and calling `sudo npm start`.

#### Adding pages
Currently, this site will only function correctly if the necessary files are in sync and correctly named. The basic way this site works is as such:

 * `server.js` looks at `src/static/scripts/pages.js` to determine the structure of the site.
 * When a request is made to any url (e.g. `/projects/sockdraw`), `server.js` parses the url into an array, where each value represents the name of a nested page (e.g. `['container', 'projects', 'sockdraw'], the string `container` will always be the first index). Incomplete urls like `/` or `/projects` are turned into `/home/main` and `/projects/main`.
 * `server.js` will start templating, recursively generating the structure of the site. Only loading the content of the page you requested, leaving the rest of the site empty of content.
 * The templating engine is very picky about where you store each pages content. It will look in `build/views/container/your/url.html`.
 * After sending the page to the client, the client side `script.js` makes POST requests to `/get`, which causes the node instance to respond with *just* the content of the page requested.
 
 Because the site is so picky about how you define your files, it's important to do it correctly. Copy the format of `src/static/js/pages.js`, and make sure each sub page you define in `pages.js` has a corresponding `html` file in `/src/static/views/container/..`.
