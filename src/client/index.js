import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './layouts/App';
import Home from './layouts/Home';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="*" component={Home} />
  </Route>
);
