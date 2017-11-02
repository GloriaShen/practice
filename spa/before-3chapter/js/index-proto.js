// 定义原型对像
	var proto = {
		sentence: 4,
		probation: 2
	}
// first method
// 定义对象的构造函数
	// var Prisoner = function (name, id) {
	// 	this.name = name;
	// 	this.id = id;
	// }

// // 将构造函数关联到原型
// 	Prisoner.prototype = proto;
// // 实例化对象
// 	var prisoner1 = new Prisoner('Joe','11');
// 	var prisoner2 = new Prisoner('Tom', '22');

// second method
	// var prisoner3 = Object.create( proto );
	// prisoner3.name = "Gloria";
	// prisoner3.id = '23';

// third method
var makePrisoner = function (name, id) {
	var prisoner = Object.create(proto);
	prisoner.name = name;
	prisoner.id = id;
	return prisoner;
}
var prisoner4 = makePrisoner('Tommy', '34');

// 对于老式浏览器
var objectCreate = function (arg) {
	if ( !arg ) {
		return {};
	}
	function obj () {}
	obj.prototype = arg;
	return new obj;
}
Object.create = Object.create || objectCreate;