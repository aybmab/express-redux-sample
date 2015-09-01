var sockets = require('../utilities/socket');	
var authenticationMiddleware = require('../middlewares/authentication.js'); //todo apply to every route starting with /api/v1
var todoModel = require('../models/todos.js');

var setTodoRoutes = function(router){

  router.post('/api/v1/todos/universal/addTodo', authenticationMiddleware.isLoggedIn, 
  		function(req, res) {
		    todoModel.createUniversalTodo(req.body.text, 
		    															req.body.clientUUID, 
		    															req.user.id,
		    															function(result){
																				sockets.notifyAllListenersOfNewTodo(result);
																	    	return res.json(result);
		    															}
		    );
		  }
	);

}

module.exports = setTodoRoutes;
