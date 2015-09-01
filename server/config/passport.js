// TODO design what to store in the session object other than just user.id
// TODO see what happens if someone sends a request with an invalid session but actual id
//        - I assume the session store just rejects it or wipes it or something....
// TODO create utility function that takes row and converts to userObject for client

var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbConnection = require('../utilities/mysqlConnection.js')();

module.exports = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    dbConnection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
      done(err, rows[0]);
    });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================

  passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      var displayName = req.body.displayName;
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      dbConnection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows) {
        if (err) {
          return done(err);
        }
        if (rows.length) {
          return done(null, false, { error: 'That email is already being used.' });
        } else {
          // if there is no user with that email
          // create the user
          var salt = bcrypt.genSaltSync(10);
          var passwordHash = bcrypt.hashSync(password, salt);

          var userInfo = {
            email: email,
            displayName: displayName
          };

          var insertQuery = "INSERT INTO users ( email, password, display_name) values (?,?,?)";

          dbConnection.query(insertQuery,[email, passwordHash, displayName],function(err, rows) {
            userInfo.id = rows.insertId;
            return done(null, userInfo);
          });
        }
      });
    })
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================

  passport.use( 
    'local-login',
    new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      dbConnection.query("SELECT * FROM users WHERE email = ?",[email], function(err, rows){
        if (err){
          return done(err);
        }
        if (!rows.length) {
          console.log("no user found...");
          return done(null, false, {error: 'Email not found.'});
        }
        // if the user is found but the password is wrong
        if (!bcrypt.compareSync( password, rows[0].password)){
          return done(null, false, {error: 'Incorrect password.'});
        }
        // all is well, return successful user
        var userObject  = { id: rows[0].id, 
                            email: rows[0].email, 
                            displayName: rows[0].display_name};
        return done(null, userObject);  
      });
    })
  );

};


