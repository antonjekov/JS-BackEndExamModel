const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models').user;


/**@__basedir comes from index.js where we put it like global const. Actualy this is __dirname the directory of our project
 * Because the path to directory is different in different operation sistems is better we to resolve the path with module path with method path.resolve()
 */

module.exports = (app) => {

    /**Here we setup view engine. In our case express-handlebars.
     * @select in helpers is a registered from me helper that help in form select to put attribute selected on option with determinate value. 
     */
    app.set('view engine', 'hbs');
    app.engine('hbs', handlebars({
        extname: 'hbs',
        layoutsDir: path.resolve(__basedir, 'views/layouts'),
        partialsDir: path.resolve(__basedir, 'views/partials'),
        defaultLayout: "main",
        views: path.resolve(__basedir, 'views'),
        helpers: {
            select: function (value, options) {
                return options.fn(this)
                    .split('\n')
                    .map(function (v) {
                        var t = 'value="' + value + '"'
                        return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
                    })
                    .join('\n')
            }
        }
    }));

    /** parse application/x-www-form-urlencoded */
    app.use(bodyParser.urlencoded({
        extended: false
    }))

    /** parse application/json */
    app.use(bodyParser.json())

    /** cookie-parser is third party module(you must install it from npm) that is supported from express team  */
    app.use(cookieParser());

    /** Setup the static files */
    app.use(express.static(path.resolve(__basedir, 'public')));
    
   
    /** compression compress our responce in gzip and reduce the size of responce */
    app.use(compression());

    /**This is global error handler. We use it for to handle all the errors that are not previously handled. For the purposes of development we can render err.message, but in production we will only serve the page with the name of the error code 500-Server error without to give more information to the client */
    app.use(function (err, req, res, next) {
        console.error(err); //don't enter in production
        res.render('500.hbs', {
            errorMessage: err.message //don't enter in production
        })
    })
    /**Passport config */
    app.use(require('express-session')({
        secret: 'keyboard cat',
        maxAge: 24 * 60 * 60 * 1000,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    
    passport.use(new LocalStrategy(userModel.authenticate()));
    passport.serializeUser(userModel.serializeUser());
    passport.deserializeUser(userModel.deserializeUser());
};