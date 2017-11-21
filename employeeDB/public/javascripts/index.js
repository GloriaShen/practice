var submitBtn = $('input[type="submit"]'),
    fileMap = {
      uploadFile: $('#uploadFile'),
      previewBox: $('.result'),
      previewPic: $('.result').find('img'),
      inputImg: $('.result input[type="hidden"]'),
      picType:  $('input[name="pictype"]')
    },
    pc,
    fileUpload, setPic;

fileUpload = function(input,callback){
  console.log('fileUpload input:',input.name);
  if(input.name){ fileMap.currentName = input.name }
   if(typeof(Worker) !== "undefined"){
     var formData = new FormData();         
     formData.append('file',input);
     
      fetch('/fileUpload', {
        method: 'POST',
        body: formData
      })
      .then(function(res){
        return res.json();
      })
      .then(function(json){
        callback(json);
      }); 
   }else{
     alert("该游览器暂不支持文件上传");
     
     return 
   }
}
setPic = function(url){
  console.log('fileMap.previewPic.length:', fileMap.previewPic.length);
  if( !fileMap.previewPic.length ){
      fileMap.previewBox.append('<img src="'+ url +'">');
      fileMap.previewPic = fileMap.previewBox.find('img');
    } else {
      fileMap.previewPic.prop('src', url);
    }
    fileMap.inputImg.val(url);
}
 
pc = new PhotoClip('#clipArea', {
    size: 200,
    outputSize: 200,
    //adaptive: ['60%', '80%'],
    file: '#upFile',
    view: '#view',
    ok: '#clipBtn',
    //img: 'img/mm.jpg',
    loadStart: function() {
      console.log('开始读取照片');
    },
    loadComplete: function() {
      console.log('照片读取完成');
      $('.cutPic').addClass('show');
    },
    done: function(dataURL) {
      console.log(dataURL);
      setPic(dataURL);
      $('.cutPic').removeClass('show');
    },
    fail: function(msg) {
      alert(msg);
    }
  });

fileMap.uploadFile.change(function(){
    fileUpload(fileMap.uploadFile[0].files[0], function(res){
      console.log('fd ressss:', res);
      fileMap.picType.val(res.distinctImg.split('/')[3]);
      pc.load(res.distinctImg);
    });
});

// });