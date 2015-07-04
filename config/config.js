import nconf from 'nconf';
import winston from 'winston';

const env = process.env.NODE_ENV;

global.C = nconf
    .argv()
    .env()
    .file('environment', __dirname + '/' + (env || 'development') + '.json')
    .file('default', __dirname + '/default.json')
    .file('package', __dirname + '/../package.json')
    .get();

winston.cli();

const transports = [];

if (C.LOGGING.CONSOLE.ENABLED) {
    transports.push(new winston.transports.Console({
        level: C.LOGGING.CONSOLE.LEVEL,
        handleException: true,
        colorize: true,
        prettyPrint: true,
        depth: 3
    }));
}

if (C.LOGGING.FILE.ENABLED) {
    transports.push(new winston.transports.File({
        handleException: true,
        timestamp: true,
        level: C.LOGGING.CONSOLE.LEVEL,
        colorize: false,
        depth: 3,
        prettyPrint: true,
        json: false,
        filename: __dirname + '/../' + C.LOGGING.FILE.NAME
    }));
}

global.Log = new winston.Logger({
    transports: transports
}).cli();
