import React from 'react';
import { Router, Route, Link, DefaultRoute, RouteHandler } from 'react-router';
import IndexPage from './page/index/index';

const Page = React.createClass({

    render() {
        return (
            <html>
                <head>
                    <title>Hello World</title>
                    <link href="/static/style/index.css" rel="stylesheet" type="text/css" />
                </head>
                <body>
                    <RouteHandler />
                </body>
                <script src="/static/app.js"></script>
            </html>
        )
    }
});

// export routes
export default (
    <Route path="/" handler={Page}>
        <DefaultRoute handler={IndexPage} />
    </Route>
);
