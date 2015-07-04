import express from 'express';
import react from 'react';
import router from 'react-router';
import routes from '../public/src/';

const app = express(),
    statics = express.static;

app.use('/lib', statics(__dirname + '/../public/lib'));
app.use('/static', statics(__dirname + '/../public/build'));

app.use('/', function(req, res, next) {
    router.run(Site.routes, req.originalUrl, function(Handler) {
        res.send(react.renderToString(<Handler />));
    });
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(500);
});
