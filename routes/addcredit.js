const {Router} = require('express')
const Credit = require('../models/credit')
const router = Router()

// Переход на страницу создания кредита
router.get('/', (req, res) => {
    res.render('add/credit', {
        layout: 'cabinet',
        title: 'Создание нового кредита'
    })
})

// Обработка формы создания кредита
router.post('/', async (req, res) => {
    console.log(req.body)
    let credit = new Credit({
        name: req.body.name,
        amountFrom: req.body.amountFrom,
        amountTo: req.body.amountTo,
        percent: req.body.percent,
        termFrom: req.body.termFrom,
        termTo: req.body.termTo 
    })

    try{
        await credit.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router