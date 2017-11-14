var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

var insertDocs, findDocs, updateDocs, removeDocs, indexCollection;

insertDocs = function(db, callback){
	var collection = db.collection('documents');
	collection.insertMany([
		{a: 'gloria'},
		{a: 'tommy'},
		{a: 'jax'}
	], function(err, result){
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log('Inserted 3 documents into the collection');
		callback(result);
	});
};

findDocs = function(db, callback){
	var collection = db.collection('documents');
	collection.find({}).toArray(function(err,docs){
		assert.equal(err, null);
		console.log("Found the following records:");
		console.log(docs);
		callback(docs);
	});
};
updateDocs = function(db, callback){
	var collection = db.collection('documents');
	collection.updateOne({a: 2},
		{ $set: {b: 1} }, 
		function(err, result){
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log('Updated the document with the field a equal to 2.');
			callback(result);
		}
	);
};
removeDocs = function(db, callback){
	var collection = db.collection('documents');
	collection.deleteOne({a: 'jax'},function(err, result){
		assert.equal(err, null);
		assert.equal(1, result.result.n);
		console.log('Removed the document with the field a equal to 3.');
		callback(result);
	});
};
indexCollection = function(db, callback){
	db.collection('documents').createIndex(
		{'a': 'gloria'},
		null,
		function(err, results){
			console.log('results:',results);
			callback();
		}
	);
};
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  // insertDocs(db, function(){
  	
  // });

    indexCollection(db, function(){
  		findDocs (db, function(){
	  		db.close();
	  	});
  	});
  // db.close();
});


