const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
    format: format.json(),
    defaultMeta: { service: 'home-money' },
    format: combine(
        // label({ label: 'right meow!' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        prettyPrint()
    ),
    transports: [
        new transports.File({ filename: 'home-money.log' }),
        new transports.Console()
    ]
});

// create a stream object with a 'write' function that will be used by `morgan`. This stream is based on node.js stream https://nodejs.org/api/stream.html.
logger.stream = {
    write: function (message) {
        // use the 'info' log level so the output will be picked up by both transports
        logger.info(message);
    }
};


module.exports = logger;