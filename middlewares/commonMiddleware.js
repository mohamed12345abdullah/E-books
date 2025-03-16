const cors = require('cors');
const bodyParser = require('body-parser');

const setupCommonMiddleware = (app) => {
    app.use(cors()); // Allow all CORS requests
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
};

module.exports = setupCommonMiddleware; 