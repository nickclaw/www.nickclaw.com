import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* root level */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { Contact } from 'containers/Contact';
import { Error } from 'containers/Error';

/* work */
import { Work } from 'containers/Work'
import { Azuqua } from 'containers/Work/Azuqua';
import { Disney } from 'containers/Work/Disney';
import { Biology } from 'containers/Work/Biology';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="contact" component={Contact} />
    <Route path="work">
      <IndexRoute component={Work} />
      <Route path="azuqua" component={Azuqua} />
      <Route path="disney" component={Disney} />
      <Route path="biology" component={Biology} />
    </Route>
    <Route path="*" component={Error} status={404} />
  </Route>
);
