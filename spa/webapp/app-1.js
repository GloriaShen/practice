/*
	app.js - Simple express server with advanced routing
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


app.route( '/' )
	.get( function ( req, res ) {
		res.redirect( '/spa.html' );
	} );
app.route( '/user/list' )
	.get( function ( req, res ) {
		res.contentType( 'json' );
		res.send({ title: 'user list' });
	} );
app.route( '/user/create' )
	.post( function ( req, res ) {
		res.contentType( 'json' );
		res.send({ title: 'user created' });
	} );
app.route( '/user/read/:id([0-9]+)' )
	.get( function ( req, res ) {
		res.contentType( 'json' );
		res.send({
			title: 'user with id ' + req.params.id + ' found'
		});
	});
app.route( '/user/update/:id([0-9]+)' )
	.post( function ( req, res ) {
		res.contentType( 'json' );
		res.send({
			title: 'user with id ' + req.params.id + ' updated'
		});
	} );
app.route( '/user/delete/:id([0-9]+)' )
	.get( function ( req, res ) {
		res.contentType( 'json' );
		res.send({
			title: 'user id with ' + req.params.id + ' deleted'
		});
	} );

server.listen( 3000 );
console.log( 'Express server listening on port  %d in %s mode',
 server.address().port, app.settings.env );