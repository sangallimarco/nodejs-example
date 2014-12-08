// BASE SETUP
// =============================================================================

var express = require('express');
var pongular = require('pongular').pongular;

pongular.module('nodejs', ['libs'])
.uses(
		'modules/libs/*.js',
		'modules/models/*.js', 
		'modules/services/*.js', 
		'modules/controllers/*.js'
)
.factory('app', function($express) {
  	var app = $express();

  	var mongoose   = require('mongoose');
	mongoose.connect('mongodb://localhost/testapp');

	var bodyParser = require('body-parser');
	var path = require('path');
	var compression = require('compression');

	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.set('view engine', 'ejs');
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(path.join(__dirname, 'public')));

  	return app;
})
.run(
	function(app, IndexCtrl, WeatherCtrl, TestCtrl) {

		app.get('/', IndexCtrl.index);
		
		app.get('/api/weather/:postcode?', WeatherCtrl.index);

		app.get('/api/test', TestCtrl.get);
		app.post('/api/test', TestCtrl.post);

		app.listen(app.get('port'), 
			function(){
				console.log("Express server listening on port " + app.get('port'));
			}
		);
	}
);

var injector = pongular.injector(['nodejs']);

