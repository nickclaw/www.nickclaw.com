import React from 'react';
import router from 'react-router';
import routes from './index';

router.run(routes, router.HistoryLocation, function(Handler) {
    React.render(<Handler />, document);
});
