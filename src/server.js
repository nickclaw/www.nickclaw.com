import express from 'express';
import React from 'react';
import router from 'react-router';
import routes from '../public/src/';

const app = express(),
    statics = express.static;

app.use('/lib', statics(__dirname + '/../public/lib'));
app.use('/static', statics(__dirname + '/../public/build'));

app.use('/', function(req, res, next) {
    router.run(routes, req.originalUrl, function(Handler) {
        res.send(React.renderToString(<Handler />));
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(500);
});

app.listen(8080, function(err) {
    console.log(arguments);
});
