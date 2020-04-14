const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./configuration/index.js');
const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const PORT = process.env.port || config.port;
const logger = require('./configuration/logger.js');
const cors = require('cors');

const app = express();

// app.use(morgan('combined', { stream: logger.stream }))
// Logs requests
app.use(morgan(':remote-addr :url :method HTTP/:http-version :user-agent', {
    // https://github.com/expressjs/morgan#immediate
    immediate: true,
    stream: logger.stream
}));

// Logs responses
app.use(morgan(':remote-addr :url :method :status :res[content-length] :response-time ms', {
    stream: logger.stream
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:8080'}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/api', require('./route/index.js')());
app.use(express.static('public'))

mongoose.connect(
    `${config.db.prefix}${config.db.host}:${config.db.port}/${config.db.name}`,
    { useNewUrlParser: true }
);

dbConnection.on('open', () => {
    logger.info('Connected to DB!')
});

app.listen(PORT, (err) => {
    if (err) throw err;
    logger.info(`Application is running on port ${PORT}`);
});
