# Sample Express-Redux Application

This is a sample project to help you bootstrap an entire web application from end to end! If you have any questions or suggestion, please feel free to reach out.

## Table of Content

1. [The Sample Project](https://github.com/aybmab/express-redux-sample#purpose)
3. [Stack](https://github.com/aybmab/express-redux-sample#stack)
4. [Purpose](https://github.com/aybmab/express-redux-sample#purpose)
5. [Setting Up](https://github.com/aybmab/express-redux-sample#setting-up)
6. [Todo List](https://github.com/aybmab/express-redux-sample#todo-list)


## The Sample Project

I started by taking Redux's todo list example and hooking it up with a backend (losing the ability to filter and mark items as complete in the process - to be implemented eventually). I wanted to mostly figure out how to do the following:

### A Good System Architecture and Project Directory

I really wanted to spend time in coming up with a clean and organized structure for this implementation. I had two criteria for "good". The first was that anyone can easily understand what's going on. The second was that it'd be easy to implement new features. If either of those two weren't met, please let me know what could be done differently!

On the highest level, I stuck with your classic client-server architecture. I then looked for some inspiration in how to organize each directory (look at the readme's in each respective folder).


### REST API Server using Node

Using Express, this was fairly straightforward.

### A User System

I'm using PassportJs to implement a user system. Essentially, a session token is generated when a client connects, it is then associated with an account if the user successfully signs on and saved to a store (currently the dev session store, but soon to be redis - though it could also be saved in the DB). The token is then used to authorize subsequent requests.

### Redux

Initially, I was using the flux architecture for the client side implementation, but then switched to redux. The idea is to have an immutable object that represents the state of the entire application. Everytime something happens, a new state object is created to reflect the change, and the views update accordingly. I definitely suggest reading up on redux and their examples [here](http://rackt.github.io/redux/).

### Optimistic Updates

After having a redux application connected to a backend, I wanted to implement optimistic updates (a.k.a. reflecting user updates immediately, even though the change wasn't necessarily saved). This was implemented by generating a unique idea on the client side and then using that reconcile after hearing back from the server.

### Live Updates/Push Notifications

After users were able to make changes, I didn't want them to have to refresh their page to see changes made by other users. I used socketio to alert each client of any updates. Please let me know what you think about this! I've never used backbone, but it seems to have a nice model and event system that could be worth exploring.

### Client Side Routing

I refused to use Angular for this project (wanted to learn something new), but become worried when I started to think about client-side routing. I'm currently using the react router - the version which is still in beta and isn't properly documented yet. It works well enough to get the job down, but I still need to do my research. It's still not clear to me what the best way of passing variables down the hierachy is.

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

* Testing (for all moving pieces....).
* Finish implementing the todo example (allow users to mark items as completed and filter the todo list).
* Implement pagination or infinite scroll.
* Implement private todos (and then use this to make sure data can be kept private between users).
* Figure out security holes with in the current system.
* Set up redis, specifically as the session store.
* Form validation on the client side.
* Params validation on the server side.
* Write a script that handles all steps to running the project.

Message me if I'm missing anything!
