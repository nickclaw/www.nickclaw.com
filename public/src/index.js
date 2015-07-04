import React from 'react';
import { Router, Route, Link, DefaultRoute } from 'react-router';

const Page = React.createClass({

    render() {
        return (
            <html>
                <head>
                    <title>Hello World</title>
                    <link href="/static/style/index.css" rel="stylesheet" type="text/css" />
                </head>
                <body>
                    <h1>Hello World</h1>
                </body>
                <script src="/static/app.js"></script>
            </html>
        )
    }
});

// export routes
export default (
    <Route path="/" handler={Page} />
);
