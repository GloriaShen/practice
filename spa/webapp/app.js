/*
	app.js - Simple express server with advanced routing
*/
'use strict';
var http = require( 'http' ),
	express = require( 'express' ),
	routes = require( './routes' ),

	morgan = require( 'morgan' ),
	bodyParser = require( 'body-parser' ),
	methodOverride = require( 'method-override' ),
	serveStatic = require( 'serve-static' ),

	app = express(),
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

routes.configRoutes( app, server );

server.listen( 3000 );
console.log( 'Express server listening on port  %d in %s mode',
 server.address().port, app.settings.env );