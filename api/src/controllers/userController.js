var user = require('../services/user');

module.exports.authenticate = function(req, res, next) {
    user.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

module.exports.register = function(req, res, next) {
    user.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports.getAll = function(req, res, next) {
    user.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

module.exports.getCurrent = function(req, res, next) {
    user.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.getById = function(req, res, next) {
    user.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports.update = function(req, res, next) {
    user.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports._delete = function(req, res, next) {
    user.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}