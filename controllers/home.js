const courseModel = require('../models').courseModel;

module.exports = {
    get: {
        home: async (req, res, next) => {
            
            try {
                const title = req.query.title||'';
                let courses
                if (title!=='') {
                    courses = await courseModel
                    .find({title: {$regex : new RegExp(title,"i")}}).lean();  
                }else{
                    courses = await courseModel.find().lean();
                }
                
                res.render('home.hbs', {
                    pageTitle: 'Home Page',
                    user: {
                        username: req.user.username
                    },
                    courses
                });
            } catch (error) {
                next(error);
            }

        },

        guestHome: async (req, res, next) => {
            try {
                const courses = await courseModel.find({
                    isPublic: true
                }).sort({
                    'usersEnrolled': -1
                }).limit(3)
                .lean();

                res.render('guest-home.hbs', {
                    pageTitle: 'Home Page',
                    courses
                });

            } catch (error) {
                next(error);
            }

        }
    }
}