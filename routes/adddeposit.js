const {Router} = require('express')
const Deposit = require('../models/deposit')
const router = Router()

router.get('/', (req, res) => {
    res.render('add/deposit', {
        layout: 'cabinet',
        title: 'Создание нового депозита'
    })
})

router.post('/', async (req, res) => {
    let deposit = new Deposit({
        name: req.body.name,
        amountFrom: req.body.amountFrom,
        amountTo: req.body.amountTo,
        percent: req.body.percent,
        termFrom: req.body.termFrom,
        termTo: req.body.termTo,
        refill: req.body.refill,
        takeAway: req.body.takeAway
    })

    try{
        await deposit.save()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router