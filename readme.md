# Sample Express-Redux Application

## Purpose

This is a sample project to help you bootstrap an entire web application from end to end! 

When trying to build an end-to-end system (client + server) from scratch, I couldn't find any examples that were complete, so I decided to put one together. I then decided to publish the sample project to share with others in hopes of:

* Receiving feedback, fine tuning my example and learning more myself.
* Helping others get insight into solving certain problems or using certain libraries.

So with that, please reach out with suggestions for improvements or questions if something doesn't make sense or isn't clear!

## Table of Content

1. [Stack](https://github.com/aybmab/express-redux-sample#stack)
2. [The Sample Project](https://github.com/aybmab/express-redux-sample#the-sample-project)
3. [Setting Up](https://github.com/aybmab/express-redux-sample#setting-up)
4. [Todo List](https://github.com/aybmab/express-redux-sample#todo-list)
4. [Other Useful Things](https://github.com/aybmab/express-redux-sample#other-useful-things)

## Stack

* [Express](http://expressjs.com/) - Node.js web application framework used for server. Sets up the REST API and handles communication with the database.
* [Redux](http://rackt.github.io/redux/) - A state container for Javascript web applications derived from [Facebook's flux architecture](https://facebook.github.io/flux/docs/overview.html).
* [React](http://facebook.github.io/react/) - A Javascript library for building UI components.
* [React Router](http://rackt.github.io/react-router/) - A routing solution to handle routing on the client side. 
* [PassportJs](http://passportjs.org/) - Authentication middleware used to implement the user system. 
* [SocketIO](http://socket.io/) - Used to push updates to users via open sockets.
* [MySql](https://www.mysql.com/) - Database (you could easily interchange this with another).
* [webpack](https://webpack.github.io/) - A module bundler (like [Browserify](http://browserify.org/)).

## The Sample Project

I started by taking [Redux's todo list example](http://rackt.github.io/redux/docs/basics/ExampleTodoList.html) and hooking it up with a backend (losing the ability to filter and mark items as complete in the process - to be re-implemented eventually). I wanted to mostly focus on the following:

### A Good System Architecture and Project Directory

I spent some time coming up with a clean and organized structure for this implementation. I had two criteria for "good". The first was that anyone can easily understand what's going on. The second was that it'd be easy to implement new features. If either of those two weren't met, please let me know what could be done differently!

On the highest level, I chose the classic client-server architecture - I wanted a clear separation between the two. I then looked for some inspiration on how to organize each directory (look at the readme's in each respective folder).


### REST API Server Using Node

Using [Express](http://expressjs.com/), this was fairly straightforward.

### A User System

I'm using [PassportJs](http://passportjs.org/) to implement a user system. Essentially, a session token is generated when a client connects, it is then associated with an account if the user successfully signs on and saved to a store (currently the dev session store, but soon to be redis - though it could also be saved in the DB). The token is then used to authorize subsequent requests.

### Redux

Initially, I was using the flux architecture for the client side implementation, but then switched to redux. The idea is to have an immutable object that represents the state of the entire application. Everytime something happens, a new state object is created to reflect the change, and the views update accordingly. I definitely suggest reading up on redux and their examples [here](http://rackt.github.io/redux/).

### Optimistic Updates

After having a redux application connected to a backend, I wanted to implement optimistic updates (a.k.a. reflect user updates immediately, even though the change wasn't necessarily saved). This was implemented by generating a unique id on the client side and then using that to reconcile after hearing back from the server. By using the client-side-generated id, react nicely handles updating the view and notifying the user on the status of each change.

### Live Updates/Push Notifications

After users were able to make changes, I didn't want them to have to refresh their page to see changes made by other users. I used [SocketIO](http://socket.io/) to alert each client of any update. Please let me know what you think about this! I've never used backbone, but it seems to have a nice model and event system that could be worth exploring.

### Client Side Routing

I refused to use Angular for this project (wanted to learn something new), but become worried when I started to think about client-side routing. I'm currently using the react router - the version which is still in beta and isn't properly documented yet. It works well enough to get the job done, but I still need to do my research. It's still not clear to me what the best way of passing variables down the hierarchy is when using the router.

## Setting up

1. Follow the steps in docs/settingUpMySql.md to set up mysql locally and create a DB user.
2. Run 'npm install' in both the /server and /client directory (I am treating both as different projects).
3. Run the database set up script using 'node /server/config/database_creation_script.js'. This will clear any tables and recreate them. Note: this is in place until we can come up with a better migration process. 

## Running the project

Note: There currently isn't a "one step" script to run the entire application, so you may need 2 terminals.

After setting up...

1. Make sure that the myql server is running on your machine.
2. Run 'npm start' in the /client folder. This will compile the current client code using [webpack](https://webpack.github.io/) and continue to compile future changes. It's nice to keep an eye on this as you update the client project.
3. Run 'npm start' from the server folder. This will run the server using [supervisor](https://github.com/petruisfan/node-supervisor) and rerun on new server changes.

## Todo List

Here is a list of things that I still need to implement/fix and/or learn about:

* Testing (for all parts of the project...).
* Finish implementing the todo example (allow users to mark items as completed and filter the todo list).
* Implement pagination or infinite scroll.
* Implement private todos (and then use this to make sure data can be kept private between users).
* Figure out security holes within the current system.
* Set up redis, specifically for the session store.
* Form validation on the client side.
* Params validation on the server side.
* Write a script that handles all steps to running the project.
* Add a loader/spinner (something like react-loader).
* When forms fail on the server side, pass back which field failed (remove the current hack on the client side).
* Write a more generic form class that other forms can inherit from.
* Reset server error when leaving a form with an error (otherwise you'll see it when rendering another form).

Message me if I'm missing anything or if you have a suggestion for how to do any of these!

### Other Useful Things

1. Download [SequelPro](http://www.sequelpro.com/) if you want a db query tool for your MySQL server.
2. Want friends to test you app running on localhost? Use [localtunnel](http://localtunnel.me/)

Again, let me know if anything is work going on this list!

