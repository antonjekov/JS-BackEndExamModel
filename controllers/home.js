
module.exports={
    get: {
        home: (req,res,next)=>{
            if (req.user) {
                res.render('home.hbs',{pageTitle:'Home Page', user: {username:req.user.username} });
                return;
            }
            res.redirect('/guest-home');
        },

        guestHome: (req,res,next)=>{
            res.render('home.hbs',{pageTitle:'Home Page'});
        }
    }
}