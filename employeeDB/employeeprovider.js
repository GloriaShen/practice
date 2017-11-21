var mongodb = require('mongodb'),
	Db = mongodb.Db,
	Connection = mongodb.Connection,
	Server = mongodb.Server,
	ObjectId = mongodb.ObjectId;

EmployeeProvider = function(host, port){
	this.db = new Db('employee', 
		new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.db.open(function(){
	});
};
EmployeeProvider.prototype = {
	getCollection: function(callback){
		this.db.collection('employees', function(err, employee_collection){
			if ( err ) { callback(err); }
			else { callback(null, employee_collection); }
		});
	},
	findAll: function(callback){
		this.getCollection(function(err, employee_collection){
			if ( err ) { callback(err); }
			else { 
				employee_collection.find().toArray(function(err, result){
					if ( err ) { callback(err); }
					else { callback(null, result); }
				});
		    }
		});
	},
	save: function(employees, callback){
		this.getCollection(function(err, employee_collection){
			if ( err ) { callback(err); }
			else {
				if( typeof(employees.length) == 'undefined' ) {
					employees = [employees];
					employees.map(function(item){
						item.created_at = new Date();
					});
					// console.log('save employees:', employees);
					employee_collection.insert(employees, function(){
						callback(null, employees);
					});
				}
			}
		});
	},
	findById: function(id, callback){
		this.getCollection(function(err, employee_collection){
			if( err ) { callback(err); }
			else {
				var oid = new ObjectId(id);
				employee_collection.find({"_id": oid}).toArray(function(err, result){
					if ( err ) { callback(err); }
					else { callback(null, result[0]); }
				});
			}
		});
	},
	update: function(id, employees, callback){
		this.getCollection(function(err, employee_collection){
			if ( err ) { callback(err); }
			else {
				employee_collection.update(
					{_id: new ObjectId(id)},
					employees,
					function(err, employees){
						if ( err ) { callback(err); }
						else { callback(null, employees); }
					}
				);
			}
		});
	},
	delete: function(id, callback){
		this.getCollection(function(err, employee_collection){
			if ( err ) { callback(err); }
			else {
				employee_collection.remove(
					{_id: new ObjectId(id)},
					function(err, employee){
						if ( err ) { callback(err); }
						else { callback(null, employee); }
					}
				);
			}
		});
	}
}
exports.EmployeeProvider = EmployeeProvider;