var express = require('express');
var config = require('./config.js');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
const auth = require('./middlewares/auth');
var mongoose = require('mongoose');
var cors = require('cors');
var userRouter = require('./routers/userRouter.js');
var friendRouter = require('./routers/friendRouter.js');
var transactionRouter = require('./routers/transactionRouter');
var errorHandler = require('./middlewares/errorHandler');

var express = require('express');
var app = express();

app.use(cors({
  "origin": "*",
  "responseHeader": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  "method": "POST, GET, PUT,PATCH, DELETE, OPTIONS",
  "maxAgeSeconds": 120
}));


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

app.use('/api/user', auth(), userRouter);
app.use('/api/friend', auth(), friendRouter);
app.use('/api/transaction', auth(), transactionRouter);

mongoose.connect('mongodb://user:expensa1@ds145093.mlab.com:45093/expensaserver', function(err){
	// mongoose.connect('mongodb://localhost/zaaaDB', function(err){
	
	if(err){
		console.log('FAILED TO CONNECT' + err);
	}
	else{
		console.log('connected to database');
	}
});
app.use(errorHandler);
app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.listen(config.Port, () => console.log(`Listening on Port: ${config.Port}`));


