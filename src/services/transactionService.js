var User = require('../models/User');
var Friend = require('../models/Friend');
var Transaction = require('../models/Transaction');
var friendService = require('../services/friendService');
var userService = require('../services/userService');

module.exports = {
    create,
    getByQuery,
    getAll,
    getById,
    _delete,
    _deleteMany
};

async function create(transactionParam, userId) {
    // validate
    if (await Friend.findOne({ friend:transactionParam.friend, user: userId })) {
        throw "Mentioned Friend does not exist for this user";
    }
    const transaction = new Transaction(transactionParam);
    transaction['friend'] = transactionParam.friend;
    transaction['user'] = userId;
    await friendService.updateAmount(transactionParam.friend, userId,transactionParam.amount);
    await transaction.save();
    return transaction.toObject();
}

async function getByQuery(query) {
    return await Transaction.find(query).sort('-createdAt');
}

async function getAll() {
    return await Transaction.find().sort('-createdAt');
}

async function getById(id) {
    return await Transaction.findById(id);
}

async function _delete(id) {
    await Transaction.findByIdAndRemove(id);
}
async function _deleteMany(query){
    await Transaction.deleteMany(query);
}
