# Client


```
client
|-- index.html                          // The main container for the client application
|-- index.js                            // The entry point for running the client application
|-- webpack.config.js                   // The configuration for webpack
|-- actions/                            // Redux Actions folders 
|   ....
|-- components/                         // "Dumb components" - consist of pure React components 
|   |-- static_pages/                   // Static pages used in the application written in React
|   |   ....
|   ....
|-- containers/                         // "Smart components" - React components that work with Redux 
|   |-- Root.jsx                        // Creates the routes for the application
|   |-- App.jsx                         // The main container for the applicatin
|   ....
|-- external/                           // External/vendor/Non-npm libraries
|   ....
|-- reducers/                           // Redux reducers 
|   |-- RootReducer.js                  // Combines all reducers
|   ....
|-- utilities/                          // Helper functions used throughout the application
|   ....
```
