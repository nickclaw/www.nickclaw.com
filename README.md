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
 * Install dependencies with npm: `npm install`
 
 * Build static content: `gulp`

 * Start server: `npm start`
    
If you have root access and can call `sudo`, you can make this node instance listen directly to port 80 by changing the port in `server.js` to `80` and calling `sudo npm start`.

For development I've found this command to be pretty helpful `rm -rf build && gulp && gulp watch`.

#### Adding pages
To be added...
