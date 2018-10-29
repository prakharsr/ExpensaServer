var user = require('../services/userService');

module.exports.authenticate = function(req, res, next) {
    user.authenticate(req.body)
        .then(user => user ? res.json({
            success:true,
            token: user.token
        }) : res.status(400).json({ message: 'Mobile No. or password is incorrect' }))
        .catch(err => next(err));
}

module.exports.register = function(req, res, next) {
    user.create(req.body)
        .then((user) => {
            res.json({
            success:true,
            msg:"User Registered.",
            ...user
        }) })
        .catch(err => next(err));
}

module.exports.getAll = function(req, res, next) {
    user.getAll()
        .then(users => res.json({success:true,users:users}))
        .catch(err => next(err));
}

module.exports.getCurrent = function(req, res, next) {
    user.getById(req.user.sub)
        .then(user => user ? res.json({success:true, user:user}) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.getById = function(req, res, next) {
    user.getById(req.params.id)
        .then(user => user ? res.json({success:true, user:user}) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.update = function(req, res, next) {
    user.update(req.user.sub, req.body)
        .then(() => res.json({success:true,msg:"updated"}))
        .catch(err => next(err));
}

module.exports._delete = function(req, res, next) {
    user._delete(req.user.sub)
        .then(() => res.json({success:true, msg:"deleted"}))
        .catch(err => next(err));
}