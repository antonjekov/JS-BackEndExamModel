module.exports = (direction='/login')=>
    function(req,res,next){
        if (req.isAuthenticated()) return next()
        return res.redirect(direction)
    }
  