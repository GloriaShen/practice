/*
socket.js - dynamic socket.io example
*/
'use strict';

var 
	setWatch,
	http = require( 'http' ),
	express = require( 'express' ),
	socketIo = require( 'socket.io' ),

	serveStatic = require( 'serve-static' ),
	fsHandle = require( 'fs' ),

	app = express(),
	server = http.createServer( app ),
	io = socketIo.listen( server ),
	watchMap = {};

setWatch = function ( url_path, file_type ) {
	console.log( 'setWatch called on ' + url_path );

	if( !watchMap[ url_path ] ) {
		console.log( 'set watch on ' + url_path );

		fsHandle.watchFile( 
			url_path.slice(1),
			(cur, prev) => {
				if ( cur.mtime !== prev.mtime ) {
					io.sockets.emit( file_type, url_path);
				}
			}
		);
		watchMap[ url_path ] = true;
	}
};




app.use( function ( req, res, next ) {
	if ( req.url.indexOf('/js/') >= 0 ) {
		setWatch( req.url, 'script' );
	} 
	else if ( req.url.indexOf('/css/') >= 0 ) {
		setWatch( req.url, 'stylesheet' );
	}
	next();
} );

app.use( serveStatic( __dirname + '/' ) );
app.get( '/', function ( req, res ) {
	res.redirect( '/socket.html' );
});

server.listen( 3000 );

