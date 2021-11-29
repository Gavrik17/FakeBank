const {Router} = require('express')
const router = Router()

router.get('/', async (req, res) => {

    res.render('home', {
        title: 'Главная страница'
    })
})

module.exports = router