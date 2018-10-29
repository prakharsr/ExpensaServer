var user = require('../services/userService');
var friend = require('../services/friendService');


module.exports.createFriend = function(req, res, next) {
    friend.create(req.body, req.user.sub)
        .then((friend) => {
            res.json({
            success:true,
            ...friend
        }) })
        .catch(err => next(err));
}

module.exports.getAllForUser = function(req, res, next) {
    friend.getByQuery({user:req.user.sub})
        .then(friends => res.json({success:true, friends:friends}))
        .catch(err => next(err));
}


module.exports.getByIdForUser = function(req, res, next) {
    friend.getByQuery({_id:req.params.id, user:req.user.sub})
        .then(friend => friend ? res.json({success:true,friend:friend}) : res.sendStatus(404))
        .catch(err => next(err));
}


module.exports.getAll = function(req, res, next) {
    friend.getAll()
        .then(friends => res.json({success:true, friends:friends}))
        .catch(err => next(err));
}


module.exports.getById = function(req, res, next) {
    friend.getById(req.params.globalId)
        .then(friend => friend ? res.json({success:true,friend:friend}) : res.sendStatus(404))
        .catch(err => next(err));
}

module.exports._delete = function(req, res, next){
    friend._delete({_id:req.params.id , user:req.user.sub})
        .then(() => res.json({success:true, msg:"deleted"}))
        .catch(err => next(err));
}