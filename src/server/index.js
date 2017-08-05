import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serve from 'connect-gzip-static';
import noSniff from 'dont-sniff-mimetype';
import frameguard from 'frameguard';
import csp from 'helmet-csp';
import uuid from 'node-uuid';
import path from 'path';
import renderPage from '../client/server';

const app = express();

// security
app.disable('x-powered-by');
app.use(noSniff());
app.use(frameguard('deny'));
app.use(csp({
  directives: {
    connectSrc: [
      `'self'`,
      'https://images.unsplash.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    scriptSrc: [
      `'self'`,
      `'unsafe-inline'`, // overrode by nonce if supported
      'https://www.google-analytics.com',
      (req, res) => {
        res.locals.nonce = uuid.v4();
        return `'nonce-${res.locals.nonce}'`;
      },
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com',
    ],
    imgSrc: [
      `'self'`,
      'https://www.google-analytics.com',
      'https://images.unsplash.com',
    ],
    formAction: ["'none'"],      // no forms
    frameAncestors: ["'none'"],  // no frames
    childSrc: ["'none'"],        // no embedding
    objectSrc: ["'none'"],       // no plugins
    mediaSrc: ["'none'"],        // no media
    reportUri: '/health/report',
  },
}));

// cache by default
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31536000'); // one year
  next();
});

// serve static files
app.use('/', serve(__dirname + '/../../build/assets'));
app.use('/static', (req, res) => res.sendStatus(404));

// dynamic stuff
app.use(morgan('dev'));
app.use(bodyParser.json({
  type: ['application/json', 'application/csp-report'],
  limit: '10mb',
}));

// smaller cache for frontend
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600'); // one day
  next();
});

app.get('/', renderPage);

app.use((req, res) => res.redirect('/'));


app.listen(8000, err => {
    console.log(err || 'Server started.');
});
