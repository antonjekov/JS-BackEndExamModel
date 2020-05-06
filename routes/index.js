/**Here we config routes for the app. If the project is more big we can separate in diferent files routes for example for users, things ... and then index.js can be barrel for all. In case for little project like this we put here all the paths */
const controlers = require('../controllers');
const isLoggedIn = require('../utils').isLoggedIn;

module.exports = (app) => {

    app.get('/course/enroll/:id', isLoggedIn(), controlers.course.get.enroll);
    app.get('/course/details/:id', isLoggedIn(), controlers.course.get.details);
    app.get('/course/create', isLoggedIn(), controlers.course.get.create);
    app.post('/course/create', isLoggedIn(), controlers.course.post.create);
    app.get('/course/edit/:id', isLoggedIn(), controlers.course.get.edit);
    app.post('/course/edit/:id', isLoggedIn(), controlers.course.post.edit);
    app.get('/course/delete/:id', isLoggedIn(), controlers.course.get.delete);
    app.get('/register', controlers.user.get.register);
    app.post('/register', controlers.user.post.register);
    app.get('/login', controlers.user.get.login);
    app.post('/login', controlers.user.post.login);
    app.get('/logout', controlers.user.post.logout);
    app.get('/guest-home', controlers.home.get.guestHome);
    app.get('/', isLoggedIn('/guest-home'), controlers.home.get.home);
    app.get('*', controlers.errors.get.notFound);
};