var express = require('express');
var config = require('./config.js');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
var mongoose = require('mongoose');
var cors = require('cors');
var router = require('./router');
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

app.use('/api', auth, router);

mongoose.connect(config.DbLink,{ useNewUrlParser: true, useCreateIndex: true }, err => {
	if (err) {
		console.log('Failed to Connect' + err);
	}
	else console.log('Connected to Database');
});

app.get('*', (req, res) => {
	res.send({ content: "Not Found" });
});

app.use(errorHandler);
app.listen(config.Port, () => console.log(`Listening on Port: ${config.Port}`));


