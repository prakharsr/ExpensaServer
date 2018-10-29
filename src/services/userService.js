var bcrypt = require('bcryptjs');
var User = require('../models/User');
var config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ phone, password }) {
    const user = await User.findOne({ phone });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await User.find().select('-password');
}

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ phone: userParam.phone })) {
        throw 'Mobile No. "' + userParam.phone + '" is already taken';
    }
    const user = new User(userParam);
    // password password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    // save user
    await user.save();
    return await authenticate({
        phone: userParam.phone,
        password: userParam.password
    });
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.phone !== userParam.phone && await User.findOne({ phone: userParam.phone })) {
        throw 'Mobile No. "' + userParam.phone + '" is already taken';
    }

    // password password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}