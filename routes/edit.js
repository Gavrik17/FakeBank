const {Router} = require('express')
const Credit = require('../models/credit')
const Deposit = require('../models/deposit')

const router = Router()

router.get('/credit/:id', async (req, res) => {
    let offer = await Credit.findById(req.params.id)
    res.render('edit/offer', {
        title: 'Редактирование кредита',
        offer
    })
})

router.get('/deposit/:id', async (req, res) => {
    let offer = await Deposit.findById(req.params.id)
    res.render('edit/offer', {
        title: 'Редактирование депозита',
        offer,
        isDeposit: true
    })
})

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