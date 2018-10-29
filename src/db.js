const config = require('./config');
var mongoose = require('mongoose');
// mongoose.connect(config.DbLink);
mongoose.Promise = global.Promise;
import models from './models';
module.exports = {
    User: models.User,
    Friend: models.Friend,
    Transaction: models.Transaction
};