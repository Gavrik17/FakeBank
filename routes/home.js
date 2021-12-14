const {Router} = require('express')
const router = Router()

// Просто загрузка главной старницы
router.get('/', async (req, res) => {

    res.render('home', {
        title: 'Главная страница'
    })
})

module.exports = router