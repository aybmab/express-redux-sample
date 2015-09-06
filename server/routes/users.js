var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply when needed
var userModel = require('../models/users.js');

var setUserRoutes = function(router){

	router.get('/api/v1/users/:id', 
		function (req, res) {
			var userId = req.params.id;
		  userModel.getUserSettings(userId, 
																function(result){
														    	return res.json(result);
																}
		  );
		}
	);

}

module.exports = setUserRoutes;
