const winston = require('winston');
const expressWinston = require('express-winston');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
});

const errorLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
    ]
});

const expressLogger = expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
});

const expressErrorLogger = expressWinston.logger({
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        // new winston.transports.File({ filename: 'combined.log' })
    ]
});

module.exports = {
    logger,
    errorLogger,
    expressLogger,
    expressErrorLogger,
}