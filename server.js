var http = require('http'),
    faye = require('faye'),
    fs = require('fs');

var bayeux = new faye.NodeAdapter({
  mount:    '/faye',
  timeout:  10
});


/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


app.get('/tt', function(req, res){
  res.render('tt');
});


app.get('/tt/:key.png', function(req, res){    
	fs.readFile('public/images/cat.png', function (err, data) {
    	if (err) throw err;
    	res.end(data);
  	});
  	
  	bayeux.getClient().publish('/' + req.params.key, {
          text:       'New email has arrived!',
          inboxSize:  34
    });
    

});

app.get('/tt/:key', function(req, res){
  res.render('tt_key', req.params);
});

bayeux.attach(app);

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
