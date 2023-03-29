const express = require('express');
const bodyParser = require('body-parser');

const config = require('config');
const cors = require('cors');

const port = config.get('port');

let routes = require('./routes/index');

const main = async () => {
    const app = express();

    app.use(bodyParser.json()); // support json encoded bodies
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.set('trust proxy', 1); // trust first proxy

    app.use('/', routes).listen(port, () =>
        console.info(`Listening on ${port}`)
    );
};

main();


