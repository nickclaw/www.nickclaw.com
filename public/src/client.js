import React from 'react';
import router from 'react-router';
import history from 'react-router/lib/BrowserHistory';
import routes from './index';

router.run(routes, history, function(Handler) {
    React.render(<Handler />, document);
});
