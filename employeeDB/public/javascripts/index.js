function fileUpload(input,callback){
   if(typeof(Worker) !== "undefined"){
     var formData = new FormData();         
     formData.append('file',$(input)[0].files[0]);
     
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
var uploadBtn = $('#uploadBtn');


$('#uploadFile').change(function(){
  fileUpload('#uploadFile', function(res){
    console.log('fd ressss:', res);
    if( !$('.result img').length ){
      $('.result').append('<img src="'+ res.distinctImg +'">');
    } else {
      $('.result img').prop('src', res.distinctImg);
    }
    $('.result input[type="hidden"]').val(res.distinctImg);
  });
});


// uploadBtn.on('click', function(){
//   fileUpload('#uploadFile', function(res){
//     console.log('ress:', res.distinctImg);
//     if( !$('.result img').length ){
//       $('.result').html('<img src="'+ res.distinctImg +'">');
//     } else {
//       $('.result img').prop('src', res.distinctImg);
//     }
//   });
// });