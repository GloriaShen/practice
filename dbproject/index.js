var MongoClient = require('mongodb').MongoClient,
	DB_CONN_STR = 'mongodb://localhost:27017/myproject',
	insertData, updateData;

insertData = function(db, callback){
	var collection = db.collection('users'),
		data = [{"name":"king11","age":21},{"name":"king20","age":22}];

	collection.insert(data, function(err, result){
		if ( err ){
			console.log(err); return;
		}
		callback(result);
	});
};
updateData = function(db, callback){
	var collection = db.collection('users'),
		whereStr = {'name': ''},
		setStr = {'name': 'kingUpdate', 'age': 18};

	collection.update(whereStr, setStr, function(err, result){
		if(err){
			console.log('updateData error:', err);
			return;
		}
		callback(result);
	});
};
MongoClient.connect(DB_CONN_STR, function(err, db){
	if(err){
		console.log('ERROR:', err);
		return;
	}
	console.log('successfully!');
	updateData(db, function(result){
		console.log(result.result);
		db.close();
	});
});