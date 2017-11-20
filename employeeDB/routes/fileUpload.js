var express = require('express');
var router = express.Router();
var formidable = require('formidable')
    fs = require('fs'),
    uuid = require('uuid'),
    path = require('path'),
    mkdirs = require('mkdirs');

router.post('/', function(req, res, next){
    var form = new formidable.IncomingForm();
   form.parse(req,function(err,fields,files){
        if(err || !files.file){
          console.log('上传失败。');
           res.jsonp({
              succeed : false,
              status : 400,
              errMsg : "上传失败"
           })
           return 
        }
        
        if (files.file.size > 16*1024*1024){
          console.log('文件不要超过16Mb');
           res.jsonp({
              succeed : false,
              status : 402,
              errMsg : "文件不要超过16Mb"
           })
           return 
        }
        
        var old_path = files.file.path,
            fileReadStream = fs.createReadStream(old_path); 
        
        var name = uuid.v1(),
              tt = name.split('-')[0],
              f1 = tt.slice(0, 2),
              // f2 = tt.slice(2, 4),
              // f3 = tt.slice(4, 6),
              // f4 = tt.slice(6, 8),
              a1 = "/../public/uploads/upFile/",
              // a1 = "/public/uploads/upFile/" + f1 + "/" + f2 + "/" + f3 + "/" + f4,
              a2 = "/" + files.file.name,
              folder = __dirname + a1,
              new_path = folder + a2,
              visit = "/uploads/upFile/" + a2;
              // visit = "/uploads/upFile/" + f1 + "/" + f2 + "/" + f3 + "/" + f4 + a2;

        mkdirs(folder);
        var fileWriteStream = fs.createWriteStream(new_path);

        fileReadStream.pipe(fileWriteStream);

        var src = path.normalize(visit),
            reg = /\\/g,
            out = src.replace(reg, "/");

        res.jsonp({
            succeed: true,
            distinctImg: out,
            errMsg: "上传成功"
        })
        /*mkdirs(folder, function(bbb) {
            console.log('bbb:', bbb);
            var fileWriteStream = fs.createWriteStream(new_path);

            fileReadStream.pipe(fileWriteStream);

            var src = path.normalize(visit),
                reg = /\\/g,
                out = src.replace(reg, "/");

            res.jsonp({
                succeed: true,
                distinctImg: out,
                errMsg: "上传成功"
            })

        }); */   
              
   });
});

module.exports = router;

