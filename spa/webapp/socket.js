/*
socket.js - simple socket.io example
*/
'use strict';

var countUp,
	http = require( 'http' ),
	express = require( 'express' ),
	socketIo = require( 'socket.io' ),

	serveStatic = require( 'serve-static' ),

	app = express(),
	server = http.createServer( app ),
	io = socketIo.listen( server ),
	countIdx = 0;

countUp = function () {
	countIdx++;
	console.log( 'countIdx:', countIdx);
	io.sockets.send( countIdx );
};

app.use( serveStatic( __dirname + '/' ) );

app.get( '/', function ( req, res ) {
	res.redirect( '/socket.html' );
});

server.listen( 3000 );

setInterval( countUp, 1000 );
