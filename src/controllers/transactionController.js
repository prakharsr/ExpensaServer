var user = require('../services/userService');
var friend = require('../services/friendService');
var transaction = require('../services/transactionService');


module.exports.createTransaction = function(req, res, next) {
    transaction.create(req.body, req.user.sub)
        .then((transaction) => {
            res.json({
            success:true,
            ...transaction
        }) })
        .catch(err => next(err));
}

module.exports.getAllForUser = function(req, res, next) {
    transaction.getByQuery({user:req.user.sub})
        .then(transaction => res.json({success:true, transaction:transaction}))
        .catch(err => next(err));
}


module.exports.getByIdForUser = function(req, res, next) {
    transaction.getByQuery({_id:req.params.id, user:req.user.sub})
        .then(transaction => transaction ? res.json({success:true,transaction:transaction}) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.getByFriendForUser = function(req, res, next) {
    transaction.getByQuery({friend:req.params.friend, user:req.user.sub})
        .then(transaction => transaction ? res.json({success:true,transaction:transaction}) : res.sendStatus(404))
        .catch(err => next(err));
}


module.exports.getAll = function(req, res, next) {
    transaction.getAll()
        .then(transaction => res.json({success:true, transaction:transaction}))
        .catch(err => next(err));
}


module.exports.getById = function(req, res, next) {
    transaction.getById(req.params.globalId)
        .then(transaction => transaction ? res.json({success:true, transaction:transaction}) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports._delete = function(req, res, next) {
    transaction._delete(req.params.id)
        .then(() => transaction ? res.json({success:true, msg:"Deleted Transaction"}) : res.sendStatus(404))
        .catch(err => next(err));
}