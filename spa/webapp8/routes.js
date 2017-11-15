/* 
	routes.js - Module to provide routing
*/

/*jslint         
	browser : true, continue : true,
	devel  : true, indent  : 4,    maxerr   : 50,
	newcap : true, nomen   : true, plusplus : true,
	regexp : true, sloppy  : true, vars     : false,
	white  : true
*/
/* global */
'use strict';
var configRoutes;

configRoutes = function ( app, server ) {
	app.get( '/', function ( req, res ) {
		res.redirect( '/spa.html' );
	} );
	app.all( '/:obj_type/*?', function ( req, res, next ) {
		res.contentType( 'json' );
		next();
	});
	app.get( '/:obj_type/list', function ( req, res ) {
			res.send({ title: req.params.obj_type + ' list'});
		})
		.post( '/:obj_type/create', function ( req, res ) {
			res.send({ title: req.params.obj_type + ' created'});
		})
		.get( '/:obj_type/read/:id([0-9]+)', function ( req, res ) {
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
};

module.exports = { configRoutes: configRoutes };