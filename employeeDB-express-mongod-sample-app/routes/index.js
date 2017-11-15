var express = require('express'),
	router = express.Router(),
	EmployeeProvider = require('../employeeprovider').EmployeeProvider,
	employeeProvider = new EmployeeProvider('localhost', 27017);
/* GET home page. */
router.get('/', function(req, res, next) {
	employeeProvider.findAll(function(err, emps){
		res.render('index', {
			title: 'Employees',
			employees: emps
		});
	});
});

module.exports = router;
