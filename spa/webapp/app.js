/*
	app.js - Simple express server with middleware
*/
'use strict';
var http = require( 'http' ),
	express = require( 'express' ),
	app = express(),

	morgan = require( 'morgan' ),
	bodyParser = require( 'body-parser' ),
	methodOverride = require( 'method-override' ),
	serveStatic = require( 'serve-static' ),

	server = http.createServer( app );

app.use( bodyParser.json() );
app.use( methodOverride() );

app.use( serveStatic( __dirname + '/public') );

if ( 'development' === app.get( 'env' ) ) {
	app.use( morgan( 'dev' ) );
}
if ( 'production' === process.env.NODE_ENV ) {
	app.use( morgan( 'common' ) );
}


app.route('/')
	.get( function ( req, res ) {
		res.redirect( '/spa.html' );
	} );


server.listen( 3000 );
console.log( 'Express server listening on port  %d in %s mode',
 server.address().port, app.settings.env );