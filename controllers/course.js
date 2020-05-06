const courseModel = require('../models').courseModel;

module.exports = {
    get: {
        create: (req, res, next) => {
            res.render('create-course.hbs',{pageTitle:'Create Course', user:{username:req.user.username} });
        },

        edit: async (req,res,next)=>{
            //TO DO CHECKBOCK PUBLIC
            try {
                const courseId = req.params.id;
                const course = await courseModel.findById(courseId).lean();
                res.render('edit-course.hbs',{pageTitle:'Edit Course', user: {username:req.user.    username}, course });
            } catch (error) {
                next(error);
            }
            
        },

        delete: async (req,res,next)=>{
            try {
                const courseId = req.params.id;
                await courseModel.findByIdAndDelete({_id:courseId});
                res.redirect('/');
            } catch (error) {
                next(error);
            }
        },

        details: async (req,res,next)=>{
            try {
                const id = req.params.id;
                const course = await courseModel.findById(id).lean();
                const isCreator = req.user._id.toString()===course.creatorId.toString()?true:false;
                const isEnrolled = course.usersEnrolled.map(x=>x.toString()).includes(req.user._id.toString());
                res.render('course-details.hbs',{pageTitle:'Course Details', user: {username:req.user.username}, course,isCreator, isEnrolled});
            } catch (error) {
                next(error)
            }
        },

        enroll: async (req,res,next)=>{
            try {
                const courseId = req.params.id;
                const userId = req.user._id;
                await courseModel.findByIdAndUpdate({
                    _id: courseId
                }, {
                    $push: {
                        usersEnrolled: userId
                    }
                });
                const redirectUrl = `/course/details/${courseId}`;
                res.redirect(redirectUrl)
            } catch (error) {
                next(error)
            }
        }
    },

    post: {
        create: async(req, res, next) => {
            const {title,description,imageUrl,isPublic}=req.body;
            const publicCourse=isPublic==="on"?true:false;
            const createdAt=new Date();
            const creatorId=req.user._id
            const course ={title,description,imageUrl,isPublic:publicCourse,createdAt,creatorId}
            try {
                await courseModel.create(course);
                res.redirect('/'); 
            } catch (error) {
                if (error.name==='ValidationError') {
                    res.render('create-course', {errors: error.errors})
                    return 
                }
                next(error)
            }
        },

        edit: async(req,res,next)=>{
            try {
                const courseId = req.params.id;
                const {title,description,imageUrl,isPublic}=req.body;
                const publicCourse=isPublic==="on"?true:false;
                const result = await courseModel.findByIdAndUpdate(courseId,{title,description,imageUrl,isPublic:publicCourse},  { runValidators: true });
                const redirectUrl = `/course/details/${courseId}`;
                res.redirect(redirectUrl);
            } catch (error) {
                next(error)
            }
        },
    }
}