var express = require('express'),
	router = express.Router(),
	EmployeeProvider = require('../employeeprovider').EmployeeProvider,
	employeeProvider = new EmployeeProvider('localhost', 27017);

var formidable = require('formidable')
    fs = require('fs'),
    uuid = require('uuid'),
    path = require('path'),
    mkdirs = require('mkdirs');
/* GET home page. */
router.get('/new', function(req, res){
	res.render('employee_new', {
		title: 'New Employee'
	});
})
.post('/new', function(req, res){

	/*var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		if(err || !files.file){
          console.log('上传失败。');
           res.jsonp({
              succeed : false,
              status : 400,
              errMsg : "上传失败"
           })
           return;
        }
        if (files.file.size > 16*1024*1024){
          console.log('文件不要超过16Mb');
           res.jsonp({
              succeed : false,
              status : 402,
              errMsg : "文件不要超过16Mb"
           })
           return; 
        }
        var old_path = files.file.path,
            fileReadStream = fs.createReadStream(old_path);
        var name = uuid.v1(),
        	a1 = "/../public/uploads/upFile/",
        	a2 = "/" + files.file.name,
        	folder = __dirname + a1,
            new_path = folder + a2,
            visit = "/uploads/upFile/" + a2;
        mkdirs(folder);
        var fileWriteStream = fs.createWriteStream(new_path);

        fileReadStream.pipe(fileWriteStream);

        var src = path.normalize(visit),
            reg = /\\/g,
            out = src.replace(reg, "/");

        // res.jsonp({
        //     succeed: true,
        //     distinctImg: out,
        //     errMsg: "上传成功"
        // });

        employeeProvider.save({
			title: req.param('title'),
			name: req.param('name'),
			pic: out
		}, function(err, docs){
			res.redirect('/');
		});

	});*/
	employeeProvider.save({
		title: req.param('title'),
		name: req.param('name'),
		pic: req.param('upFile')
	}, function(err, docs){
		console.log('docs:', docs);
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
			name: req.param('name'),
			pic: req.param('upFile')
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
