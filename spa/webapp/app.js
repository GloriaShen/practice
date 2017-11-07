/*
	app.js - Simple express server with advanced routing
*/
'use strict';
var http = require( 'http' ),
	express = require( 'express' ),
	app = express(),
	router = express.Router(),

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
router.all( '/:obj_type/*?', function ( req, res, next ) {
	res.contentType( 'json' );
	next();
});
app.get( '/:obj_type/list', function ( req, res ) {
	res.send({ title: req.params.obj_type + ' list'});
});
app.post( '/:obj_type/create', function ( req, res ) {
		res.send({ title: req.params.obj_type + ' created'});
	});
app.get( '/:obj_type/read/:id([0-9]+)', function ( req, res ) {
	res.send({
		title: req.params.obj_type + ' with id ' + req.params.id + ' found'
	});
})
	.post( '/:obj_type/update/:id([0-9]+)', function ( req, res ) {
		res.send({
			title: req.params.obj_type + ' with id ' + req.params.id + ' updated'
		});
	})
	.get( '/:obj_type/delete/:id([0-9]+)', function ( req, res ) {
		res.send({
			title: req.params.obj_type + ' with id ' + req.params.id + ' deleted'
		});
	});

/*app.get( '/user/list', function ( req, res ) {
	res.send({ title: 'user list' });
} );
app.post( '/user/create', function ( req, res ) {
	res.send({ title: 'user created' });
} );
app.get( '/user/read/:id([0-9]+)', function ( req, res ) {
	res.send({ title: 'user with id ' + req.params.id + ' found'});
});
app.post( '/user/update/:id([0-9]+)', function ( req, res ) {
	res.send({ title: 'user with id ' + req.params.id + ' updated' });
});
app.get( '/user/delete/:id([0-9]+)', function ( req, res ) {
	res.send({ title: 'user with id ' + req.params.id + ' deleted' });
});*/
server.listen( 3000 );
console.log( 'Express server listening on port  %d in %s mode',
 server.address().port, app.settings.env );