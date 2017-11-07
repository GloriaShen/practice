/* 
	app.js - Simple connect server with logging
*/

/*jslint         
	browser : true, continue : true,
	devel  : true, indent  : 4,    maxerr   : 50,
	newcap : true, nomen   : true, plusplus : true,
	regexp : true, sloppy  : true, vars     : false,
	white  : true
*/
/* global */
var connectHello, server,
	http = require( 'http' ),
	connect = require( 'connect' ),
	app = connect(),
	morgan = require( 'morgan' ),
	bodyText = 'Hello Connect';

connectHello = function ( request, response ) {
	response.setHeader( 'content-length', bodyText.length );
	response.end( bodyText );
};

app.use( morgan('combined') )
	.use( connectHello );
server = http.createServer( app );

server.listen( 3000 );

console.log( 'Listening on port %d', server.address().port );