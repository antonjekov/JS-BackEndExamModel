/**Here we config routes for the app. If the project is more big we can separate in diferent files routes for example for users, things ... and then index.js can be barrel for all. In case for little project like this we put here all the paths */
const controlers = require('../controllers')

module.exports = (app) => {
    
    app.get('/', controlers.home.get.home);
    app.get('/guest-home',controlers.home.get.guestHome);
    app.get('/register', controlers.user.get.register);
    app.post('/register', controlers.user.post.register);
    app.get('/login', controlers.user.get.login);
    app.post('/login', controlers.user.post.login);
    app.get('/logout',controlers.user.post.logout);
    app.get('*', controlers.errors.get.notFound);
};