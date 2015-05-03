var should = require('should'),
	request = require('supertest'),
	app = ('../app.js'),
	mongoose = require('mongoose'),
	//Book = mongoose.model('Book'),
	agent = request.agent(app);

mongoose.model('Book', new mongoose.Schema());

var Book = mongoose.model('Book')

describe('Book CRUD Test: ', function(){
	it('Should allow a book to be posted and return a read and _id', function(done){
		var bookPost = {title:'test book', author:'Jon', genre:'Fiction'};

		agent.post('/api/books')
			.send(bookPost)
			.expect(200)
			.end(function(err, results){
				results.body.read.should.equal(false);
				results.body.should.have.property('_id');
			});
	});

	afterEach(function(done){
		Book.remove().exec();
		done();
	});
});
