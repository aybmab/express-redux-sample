# Sample Express-Redux Application

This is a sample project to help you bootstrap an entire web application from end to end!

## Table of Content

1. What exactly does the project contain?
2. Stack
3. 
4. 
5. 
6. 


## What exactly does the project contain?

This project:
* Allows users to signup/login.
* 


## Stack

* [Express](http://expressjs.com/) - Node.js web application framework used for server. Sets up the REST API and handles communication with the database.
* [Redux](http://rackt.github.io/redux/) - A state container for Javascript web applications derived from [Facebook's flux architecture](https://facebook.github.io/flux/docs/overview.html).
* [React](http://facebook.github.io/react/) - A Javascript library for building UI components.
* [React Router](http://rackt.github.io/react-router/) - A routing solution to handle routing on the client side. 
* [PassportJs](http://passportjs.org/) - Authenticatin middleware used to implement the user system. 
* [SocketIO](http://socket.io/) - Used to push updates to users via open sockets.
* [MySql](https://www.mysql.com/) - Database (you could easily interchange this with another).
* [webpack](https://webpack.github.io/) - A module bundler (like [Browserify](http://browserify.org/)).

## Purpose

When trying to build an end-to-end system (client + server) from scratch, I couldn't find any examples that were complete, so I decided to put one together. As I looked through many projects, I realized the following:

* There clearly is no standard in building a web application (which has it's pro's and con's).
* A lot of documentation out there sucks.
* There's a lot I don't know.

With that, I decided to publish my project to share with others in hopes of:
* Receiving feedback, fine tuning my example and learning new things myself.
* Helping others get insight into solving certain problems or using certain libraries.

So with that, please reach out with suggestions for improvments or questions if something doesn't make sense or isn't clear!

## Setting up

1. Follow the steps in docs/settingUpMySql.md to set up mysql locally.
2. Download [SequelPro](http://www.sequelpro.com/) if you want a db query tool for your MySQL server.
3. Create a database and user
3. Run 'npm install' in the root directory and in the /client folder.

## Running the project

There currently isn't a "one step" script to run the entire application (e.g. ./watch.sh").

First, make sure that the myql server is running on your machine.

Second, run the database set up script using 'node /server/config/database_creation_script.js'. This will clear any tables and recreate them. Note: this is a hack until we can come up with a proper migration process. 

Then, run 'webpack --progress --color --watch' in the /client folder. This will compile the current client code and continue to compile future changes.

Lastly, run 'npm install' from the root directory. This will run the server and recompile on new server changes.


## Todo List

* Finish implementing the todo example (allow users to mark items as completed).
* Implement private todos.
* Compile all steps to running the project into one script.
* Figure out security holes.
* Set up redis, specifically as the session store.
* Form validation on the client side.
* Testing (for all moving pieces....).

Message me if I'm missing anything!
