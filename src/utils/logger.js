const winston = require('winston');
const { format } = require('winston');

const logger = winston.createLogger({
    level: 'info',
    "format": format.combine(
        format.timestamp({ format: 'MM-YY-DD HH:MM:SS' }),
        format.colorize(),
        format.json(),
        format.splat(),
        format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

module.exports = logger;