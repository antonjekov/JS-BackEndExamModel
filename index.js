/**@__dirname in a node script returns the path of the folder where the current JavaScript file resides. Here we assign variable @__basedir to global node js object. So we can use easy this variable in all the project how navigation to current project folder. */
global.__basedir = __dirname;

const express = require('express');
const config = require('./config/config');
 
const dbConnector = require('./config/database');
dbConnector().then(() => {
    /**Creates express application */
    const app = express()
    /**Includes external packets that we use like cookie-parser, handlebars ...*/
    require('./config/express')(app);
    /**Determinate routes for access */
    require('./routes')(app);
    /**App(our server) start to listen for connections from clients*/
    app.listen(config.port, console.log(`Server listening on port ${config.port}`))
})