var router = require('express').Router();
var path = require('path');

// Rest API
require(path.join(__dirname, './', 'todos'))(router);

// Homepage/Client 
router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
  res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
});



module.exports = function(app, passport) {
	// set authentication routes
	require('./authentication.js')(app, passport);

	// set other routes
	app.use('/', router);
};
