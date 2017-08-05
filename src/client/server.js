import React from 'react';
import { renderToString } from 'react-dom/server';
import routes from './index';
import assets from '../../assets';

export default (req, res) => {
  const content = renderToString(routes);

  res.send(`
    <html>
      <head>
        <title>nickclaw</title>
        <link rel="stylesheet" href="${assets.main.css}" />
        <link rel="prefetch" href="https://github.com/nickclaw" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
        <script src="${assets.main.js}" async defer></script>
      </head>
      <body>
        <div id="container">${content}</div>
      </body>
    </html>
  `);
};
