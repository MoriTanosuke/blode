
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({secret: "keyboard cat"}));
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

app.get('/blog/:year/:month/:day/', function(req, res){ res.render('blog', { title: 'Entries for ' + req.params.year + "-" + req.params.month + "-" + req.params.day }); });
app.get('/blog/:year/:month/:day/:title', function(req, res){ res.render('entry', { title: req.params.title, body: 'no body here'}); });
app.get('/', routes.index);
app.get('*', function(req, res){ res.send('Uh, what?', 404); });

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
