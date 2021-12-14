const {Router} = require('express')
const Person = require('../models/person')
const router = Router()

// Страница авторизации
router.get('/login', (req, res) => {
    res.render('auth', {
        title: 'Авторизация'
    })
})

// Обработка кнопки Выйти
router.get('/logout', async (req, res) => {
    req.session.destroy(() => {     //Уничтожение объекта сессии для разавторизации
        res.redirect('/')
    })
})

// Обработка формы авторизации, создание сессии
router.post('/', async (req, res) => {
    try {
        let {login, password} = req.body
        let candidate = await Person.findOne({ login })

        if (candidate){
            if(candidate.password === password){
                let whichPost = await candidate.populate('personalData')
                req.session.person = candidate
                req.session.isAuth = true
                req.session.whichPost = whichPost.personalData.post
                req.session.save(req.session.save(err => {
                    if (err) {
                        throw err
                    }
                }))
            } else {
                res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    } catch (error) { 
        console.log(error)
    }

    res.redirect('/')
})




module.exports = router