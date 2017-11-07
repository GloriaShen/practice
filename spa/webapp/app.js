/* 
	app.js - hello world
*/

/*jslint         
	browser : true, continue : true,
	devel  : true, indent  : 4,    maxerr   : 50,
	newcap : true, nomen   : true, plusplus : true,
	regexp : true, sloppy  : true, vars     : false,
	white  : true
*/
/* global */
var http, server;

http = require( 'http' );
server = http.createServer( function ( request, response ) {
	console.log( request );
	var response_text = request.url === '/test' ? 'you have hit the test page' : 'hello world';
	response.writeHead( 200, { 'Content-Type': 'text/plain' } );
	response.end( response_text );
}).listen( 3000 );

console.log( 'Listening on port %d', server.address().port );