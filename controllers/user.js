const passport = require('passport');
const userModel = require('../models').user;

module.exports = {
    get: {
        login: (req, res, next) => {
            res.render('login.hbs', {pageTitle: 'Login Page'});
        },

        register: (req, res, next) => {
            res.render('register.hbs', {pageTitle: 'Logout Page'});
        }
    },

    post: {
        login: (req, res, next) => {
            passport.authenticate('local',
                (err, user) => {
                    if (err) {
                        return next(err);
                    }

                    if (!user) {
                        return res.render('login.hbs',{ error: {message:"Wrong username or password!"}});
                    }

                    req.logIn(user, function (err) {
                        if (err) {
                            return next(err);
                        }

                        return res.redirect('/');
                    });
                })(req, res, next);
        },

        register: (req, res, next) => {
            const {
                username,
                password,
                repeatPassword
            } = req.body;

            if (password!==repeatPassword) {
                return res.render('register.hbs',{ error: {message:"Password and repeat password dosn't match"}})
            }

            userModel.register(new userModel({
                username: username
            }), password, function (err, user) {
                if (err) {
                    return res.render('register.hbs', {
                        error: err
                    });
                }

                passport.authenticate('local',
                (err, user) => {
                    if (err) {
                        return next(err);
                    }

                    if (!user) {
                        return res.render('login.hbs',{ error: {message:"Wrong username or password!"}});
                    }

                    req.logIn(user, function (err) {
                        if (err) {
                            return next(err);
                        }

                        return res.redirect('/');
                    });
                })(req, res, next);
            });
        },

        logout: async (req, res) => {
            await req.logout();
            if (req.session) {
                req.session.destroy((err) => {
                    if (err) {
                        next(err)
                    } else {
                        res.clearCookie('connect.sid')
                        res.redirect('/')
                    }
                })
            }

        }
    }
}