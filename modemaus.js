/*
 * Modemaus
 * http://www.modemaus.net
 *
 * Copyright (c) 2011 "netpoetica" Keith Rosenberg
 *
 */

'use strict';

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app;

app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/:root/:scale', routes.scale);
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
