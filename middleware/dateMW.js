module.exports = async function(req, res, next) {
    if (!req.person){
        next()
    }
    let person = await req.person.populate('personalData')
    let dateBirth = new Date(person.personalData.dateBirth)
    let pasportDate = new Date(person.personalData.pasportDate)

    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    
    res.locals.dateBirth = dateBirth.toLocaleString("ru", options)
    res.locals.pasportDate = pasportDate.toLocaleString("ru", options)

    next()
}

// Данный обработчик форматирует дату в понятный вид типа - 12 апреля 2021 года