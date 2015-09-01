module.exports = {

	isLoggedIn: function(req, res, next) {
		if (req.isAuthenticated()) return next();
		res.json({error: "Not signed in"});
	},

	isLoggedOut: function(req, res, next) {
		if (!req.isAuthenticated()) return next();
		res.json({error: "Already signed in"});
	}

};








