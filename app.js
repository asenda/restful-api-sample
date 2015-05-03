var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

// db connection to mongo
var db;
if(process.env.ENV == 'Test')
	db = mongoose.connect('mongodb://localhost/bookAPI_test');
else
	db = mongoose.connect('mongodb://localhost/bookAPI');	


var Book = require('./models/bookModel');

var app = express();
var port = process.env.port || 3000;

// routers
bookRouter = require('./Routes/bookRoutes')(Book);

// app usages 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);


app.get('/', function(req, res){
	res.send('welcome to my api');
});

app.listen(port, function(){
	console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app;