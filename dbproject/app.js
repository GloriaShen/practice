var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/test';

var insertDocs, findDocs, updateDocs, removeDocs, indexCollection,
	createCapped, closeDb, createValidated;

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
createCapped = function(db, callback){
	db.createCollection('myCollection', {
		"capped": true, "size": 10000, "max": 5000
	}, function(err, results){
		console.log('collection created.');
		callback();
	});
};
closeDb = function(db){
	return function(){
		db.close();
	};
};
createValidated = function(db, callback){
	db.createCollection("contacts",{
		'validator': {
			'$or': [
				{ 'phone': {'$type': 'string'} },
				{ 'email': {'$regex': /@mongodb\.com$/} },
				{ 'status': {'$in': ['Unknown', 'Incomplete']} }
			]
		}
	}, function(err, results){
		console.log('Collection created.');
		callback();
	});
};
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
console.log('ERRRRR:', err);
  assert.equal(null, err);
  console.log("Connected successfully to server");
  // insertDocs(db, function(){
  		
  // });

   //  findDocs (db, function(){
  	// 	db.close();
  	// });
  	// createCapped(db, closeDb(db));
  	// 
  	createValidated(db, function(db){
  		findDocs(db, closeDb(db));
  	});
});


