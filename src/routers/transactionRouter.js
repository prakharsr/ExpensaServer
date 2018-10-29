var express = require('express');
var transactionRouter = express.Router();
var transactionController = require('../controllers/transactionController');

transactionRouter.post('/create', transactionController.createTransaction);
transactionRouter.get('/', transactionController.getAllForUser);
transactionRouter.get('/all', transactionController.getAll);
transactionRouter.get('/:id', transactionController.getByIdForUser);
transactionRouter.get('/friend/:friend', transactionController.getByFriendForUser);
transactionRouter.get('/:globalId', transactionController.getById);
transactionRouter.delete('/:id', transactionController._delete);
module.exports = transactionRouter;