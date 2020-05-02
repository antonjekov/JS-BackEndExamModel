/**Here we config routes for the app. If the project is more big we can separate in diferent files routes for example for users, things ... and then index.js can be barrel for all. In case for little project like this we put here all the paths */
const controlers = require('../controllers')

module.exports = (app) => {
    
    // app.get('/', controlers.homeHandler);
    app.get('*', controlers.notFoundHandler);
};