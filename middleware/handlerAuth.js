module.exports = function(req, res, next) {
    res.locals.isAuth = req.session.isAuth
    
    next()
}

// Создает переменную isAuth которую можно использовать в любой части приложения