(function ( root, factory ) {
	if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(root 即 window)
        root.preloader = factory(root);
    }
}(this, function(){
	var isFunc = function ( f ) {
		return typeof(f) === 'function';
	};
	var p = function( configMap ){
		if ( !configMap ) {
			console.log( '参数错误！' );
			return false;
		}
		this.resources = configMap.resources || [];
		this.baseUrl = 	configMap.baseUrl || './images';
		this.onStart = configMap.onStart || null;
		this.onProgress = configMap.onProgress || null;
		this.onComplete = configMap.onComplete || null;

		this.total = this.resources.length;
		this.countIdx = 0;
	};
	p.prototype.start = function () {
		var url, _this = this, image;
		if ( !this.total ) { return false; }
		this.resources.forEach(function(item){
			url = (item.indexOf('http') === 0 ? item : (_this.baseUrl + item));

			image = new Image();
			image.onload = image.onerror = function(){
				isFunc( _this.onProgress ) && _this.onProgress(++_this.countIdx, _this.total);
				(_this.countIdx === _this.total) && isFunc( _this.onComplete ) && _this.onComplete( _this.total );
			};
			image.src = url;
		});
		isFunc( _this.onStart ) && _this.onStart(_this.total);
	};
	return p;
}));



