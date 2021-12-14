const {Router} = require('express')
const Credit = require('../models/credit')
const Deposit = require('../models/deposit')

const router = Router()

// Переход на страницу редактирования выбранного кредита
router.get('/credit/:id', async (req, res) => {
    let offer = await Credit.findById(req.params.id)
    res.render('edit/offer', {
        title: 'Редактирование кредита',
        offer   //Здесь передаюься данные о выбранном кредите. Аналогично работает и в других функциях типа res.render
    })
})

// Переход на страницу редактирования выбранного депозита
router.get('/deposit/:id', async (req, res) => {
    let offer = await Deposit.findById(req.params.id)
    res.render('edit/offer', {
        title: 'Редактирование депозита',
        offer,
        isDeposit: true
    })
})

// Обрабокта формы при изменении объекта (кредит или депозиит)
router.post('/', async (req, res) => {
    let {id} = req.body
    delete req.body.id
    if (req.body.isDeposit == 'true'){
        delete req.body.isDeposit
        await Deposit.findByIdAndUpdate(id, req.body)
        res.redirect('/offers/deposits')
    } else {
        await Credit.findByIdAndUpdate(id, req.body)
        res.redirect('/offers/credits')
    }
})

// Удаление кредита или депозита
router.post('/remove', async (req, res) => {
    try {
        if (req.body.isDeposit == true){
            await Deposit.deleteOne({_id: req.body.id})
            res.redirect('/offers/deposits')
        } else {
            await Credit.deleteOne({_id: req.body.id})
            res.redirect('/offers/credits')
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router