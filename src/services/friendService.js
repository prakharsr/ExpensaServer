var bcrypt = require('bcryptjs');
var User = require('../models/User');
var Friend = require('../models/Friend');
var Transaction = require('../models/Transaction');
var config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = {
    create,
    getByQuery,
    getAll,
    getById,
    updateAmount,
    _delete
};
//takes friend json and Id of user
async function create(friendParam, user) {
    // validate
    if (await User.findOne({ phone: friendParam.phone, user: user })) {
        throw 'Mobile No. "' + friendParam.phone + '" is already taken by other friend';
    }
    const friend = new Friend(friendParam);
    friend['user'] = user;
    // save user
    await friend.save();
    return friend.toObject();
}

async function updateAmount(friend, user,amount) {
    var friend = await Friend.findOne({_id:friend, user:user});
    friend.amount = friend.amount + amount;
    return await friend.save();
}

async function getByQuery(query) {
    return await Friend.find(query);
}
async function getAll() {
    return await Friend.find();
}

async function getById(id) {
    return await Friend.findById(id);
}
async function _delete(id) {
    await Transaction.deleteMany({friend:id})
    await Friend.findByIdAndRemove(id);
}