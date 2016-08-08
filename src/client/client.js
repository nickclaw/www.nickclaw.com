import React from 'react';
import { render } from 'react-dom';
import { Router, match } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useScrollToTop from 'scroll-behavior/lib/useScrollToTop';
import { trigger } from 'redial';

import routes from './index';
import createStore from './createStore';
import flattenComponents from './utils/flattenComponents';

const _history = useScrollToTop(createBrowserHistory)();
const store = createStore(window.__INITIAL_DATA__.state, _history);
const history = syncHistoryWithStore(_history, store);

window.store = store;

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('container')
);


history.listen(location => {
  if (typeof window !== "undefined") {
    ga('send', {
      hitType: 'pageview',
      page: location.pathname
    });
    ga('set', 'page', location.pathname);
  }

  match({ routes, location }, (err, redirect, props) => {
    const components = flattenComponents(props.routes);
    const locals = {
      location: props.location,
      params: props.params,
      dispatch: store.dispatch,
    }

    if (window.__INITIAL_DATA__.state) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.__INITIAL_DATA__.state;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals);
    }

    // Fetch deferred, client-only data dependencies:
    trigger('defer', components, locals);
  })
});
