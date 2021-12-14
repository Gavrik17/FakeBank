const {Router} = require('express')
const Person = require('../models/person')
const PersonalData = require('../models/personalData')
const router = Router()

// Переход на страницу добавления клиента в личном кабинете
router.get('/', (req, res) => {
    res.render('add/person',{
        layout: 'cabinet',
        title: 'Добавление нового клиента'
    })
})

// Обработка формы создания клиента
router.post('/', async (req, res) => {
    let personalData = new PersonalData({   //Добавление в схему (класс) для занесения в бд
        surname: req.body.surname,
        name: req.body.name,
        patronymic: req.body.patronymic,
        dateBirth: req.body.dateBirth,
        phone: req.body.phone,
        email: req.body.email,
        pasport: req.body.pasport,
        pasportDate: req.body.pasportDate,
        division: req.body.division,
        post: req.body.post,
        key: req.body.key
    })

    let person = new Person({   //Добавление в схему (класс) для занесения в бд
        login: Math.random().toString(36).slice(-8),
        password: Math.random().toString(36).slice(-8),
        personalData: personalData
    })
    try {
        await personalData.save()   //Занесение в бд
        await person.save()
        res.render('add/logpas',{
            layout: 'cabinet',
            info: person
        })
    } catch (error){
        console.log(error)
    }
})

module.exports = router