var express = require('express'),
	router = express.Router(),
	EmployeeProvider = require('../employeeprovider').EmployeeProvider,
	employeeProvider = new EmployeeProvider('localhost', 27017);

/* GET home page. */
router.get('/new', function(req, res){
	res.render('employee_new', {
		title: 'New Employee'
	});
})
.post('/new', function(req, res){
	employeeProvider.save({
		title: req.param('title'),
		name: req.param('name')
	}, function(err, docs){
		res.redirect('/');
	});
})
.get('/:id/edit', function(req, res){
	employeeProvider.findById(req.param('_id'), function(err, employee){
		res.render('employee_edit', {
			employee: employee
		});
	});
})
.post('/:id/edit', function(req, res){
	employeeProvider.update(
		req.param('_id'),
		{
			title: req.param('title'),
			name: req.param('name')
		},
		function(err, docs){
			res.redirect('/');
		}
	);
})
.post('/:id/delete', function(req, res){
	employeeProvider.delete(req.param('_id'),function(err, docs){
		res.redirect('/');
	});
});

module.exports = router;
