const winston = require('winston');
//this util is for saving the logs
module.exports = new(winston.createLogger)({
    transports: [
        new(winston.transports.Console)({
            level: 'info'
        }),
        new winston.transports.File({ filename: 'logs/logfile.log' })
    ]
});