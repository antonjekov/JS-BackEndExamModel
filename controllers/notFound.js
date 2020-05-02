module.exports = async (req, res, next) => {
    try {
        await res.render('404.hbs');
    } catch (error) {
        next(error);
    }
};