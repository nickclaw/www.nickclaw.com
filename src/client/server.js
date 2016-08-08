import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { trigger } from 'redial';
import Helmet from 'react-helmet';

import routes from './index';
import createStore from './createStore';
import { main as asset } from '../../assets';
import flattenComponents from './utils/flattenComponents';

export default function(req, res, next) {

  const store = createStore();
  const location = createLocation(req.originalUrl, { store });
  location.query = req.query;

  match({ routes, location }, function(err, redirect, props) {
    if (err) return next(err);

    // handle redirect with a 302
    if (redirect) {
      var path = url.format({
        pathname: redirect.pathname,
        query: redirect.query
      });
      return res.redirect(path);
    }

    const components = flattenComponents(props.routes);
    const locals = {
      location: props.location,
      params: props.params,
      dispatch: store.dispatch,
    }

    trigger('fetch', components, locals).then(() => {
      const content = renderToString(
        <Provider store={store}>
          <RoutingContext {...props} />
        </Provider>
      );
      const head = Helmet.rewind();

      const inject = 'window.__INITIAL_DATA__ = ' + JSON.stringify({
        state: store.getState()
      });

      const document = (
`<html>
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    <link href="${process.env.SITE_URL}/static/${asset.css}" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <div id="container">${content}</div>
    <script nonce="${res.locals.nonce}">${inject}</script>
    <script nonce="${res.locals.nonce}">
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-72003157-3', 'auto');
    </script>
  </body>
</html>`
      );

      // send document
      res.send(document);
    }).catch(next);
  });
}
