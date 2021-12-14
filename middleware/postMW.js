module.exports = function(req, res, next) {
    res.locals.isAdm = false
    res.locals.isEmployee = false
    res.locals.isClient = false
    if (req.session.whichPost == 'Администратор'){
        res.locals.isAdm = true
    } else if (req.session.whichPost == 'Сотрудник') {
        res.locals.isEmployee = true
    } else {
        res.locals.isClient = true
    }
    next()
}

//Запоминаем роль текущего пользователя