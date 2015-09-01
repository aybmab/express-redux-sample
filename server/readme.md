# Server


```
server
|-- index.js                            // The entry point for running the project application
|-- app.js                              // Creates the Express application
|-- config/                             // Configuration files used to connect to different machines or set settings
|   |-- passport.js                     // Defines strategies for passport configuration
|   ....
|-- middlewares/                        // Express middleware that process requests before REST API routes
|   ....
|-- models/                             // Represents data and handles business logic for interacting with DB
|   ....  
|-- routes/                             // REST API. A.k.a. "controllers"
|   |-- index.js                        // Handles importing and setting up all other routes
|   .....                     			
|-- scripts/                            // Scripts used to set things up
|   |-- database_creation_script.js     // Node script for re-creating database tables (deletes old data!)
|   ....
|-- utilities/                          // Helper functions used throughout the application
|   ....
|-- vendor/                             // Non-npm libraries
```
