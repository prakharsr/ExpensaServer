var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/userController');

userRouter.post('/authenticate', userController.authenticate);
userRouter.post('/register', userController.register);
userRouter.get('/', userController.getAll);
userRouter.get('/current', userController.getCurrent);
userRouter.get('/:id', userController.getById);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController._delete);

module.exports = userRouter;