var express = require('express'),
	router = express.Router(),
	EmployeeProvider = require('../employeeprovider').EmployeeProvider,
	employeeProvider = new EmployeeProvider('localhost', 27017);

var formidable = require('formidable')
    fs = require('fs'),
    uuid = require('uuid'),
    path = require('path'),
    mkdirs = require('mkdirs');

var decodeBase64Image, processImg;

decodeBase64Image = function(dataString, callback){
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

	if (matches.length !== 3) {
	callback( new Error('Invalid input string') );
	}

	response.type = matches[1];
	response.data = new Buffer(matches[2], 'base64');

	return response;
}
processImg = function(params, callback){

	var picname = 'cut'+ params.picname,
		pictype = params.pictype.split('.')[1],
		imageBuffer = decodeBase64Image(params.upFile),
		a1 = __dirname + '/../public/uploads/upFile/',
		i1 = picname + '.' + pictype,
		imageUrl =  a1 + i1;
		// console.log('imageUrl: ',imageUrl);
		// console.log('imageBuffer: ',imageBuffer);
	mkdirs(a1);
	fs.writeFile( imageUrl, imageBuffer.data, function(err) { 
		// console.log('err:', err);
		if(!err){
			callback(i1);
		}
		
	});
}
/* GET home page. */
router.route('/new')
	.get(function(req, res){
		res.render('employee_edit', {
			title: 'New Employee',
			employee: {
				name: '',
				title: '',
				pic: ''
			}
		});
	})
	.post(function(req, res){
		new processImg({
			picname: req.param('name'),
			pictype: req.param('pictype'),
			upFile: req.param('upFile')
		}, function(picname){
			employeeProvider.save({
				title: req.param('title'),
				name: req.param('name'),
				pic: '/uploads/upFile/' + picname
			}, function(err, docs){
				res.redirect('/');
			});
		});
	});
router.route('/:id/edit')
	.get(function(req, res){
		employeeProvider.findById(req.param('_id'), function(err, employee){
			res.render('employee_edit', {
				employee: employee
			});
		});
	})
	.post(function(req, res){
		new processImg({
			picname: req.param('picname'),
			pictype: req.param('pictype'),
			upFile: req.param('upFile')
		}, function(picname){
			employeeProvider.update(
				req.param('_id'),
				{
					title: req.param('title'),
					name: req.param('name'),
					pic: '/uploads/upFile/' + picname
				},
				function(err, docs){
					res.redirect('/');
				}
			);
		});
	});
router.route('/:id/delete')
	.post(function(req, res){
		var pa = __dirname + '/../public' + req.param('pic');
		fs.unlink(pa,function(err){
			console.log('fs.unlink err:', err);
		});
		employeeProvider.delete(req.param('_id'),function(err, docs){
			res.redirect('/');
		});
	});

module.exports = router;
