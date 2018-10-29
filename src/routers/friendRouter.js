var express = require('express');
var friendRouter = express.Router();
var friendController = require('../controllers/friendController');

friendRouter.post('/create', friendController.createFriend);
friendRouter.get('/', friendController.getAllForUser);
friendRouter.get('/all', friendController.getAll);
friendRouter.get('/:id', friendController.getByIdForUser);
friendRouter.get('/:globalId', friendController.getById);
friendRouter.delete('/:id', friendController._delete);
module.exports = friendRouter;