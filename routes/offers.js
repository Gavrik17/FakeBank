const {Router} = require('express')
const Credit = require('../models/credit')
const Deposit = require('../models/deposit')
const Person = require('../models/person')

const router = Router()


router.get('/credits', async (req, res) => {
    let credit = await Credit.find()
    res.render('offers', {
        title: 'Кредиты',
        credit
    })
})

router.get('/deposits', async (req, res) => {
    let deposit = await Deposit.find()
    res.render('offers', {
        title: 'Вклады',
        deposit
    })
})

router.get('/credit/:id', async (req, res) => {
    let offer = await Credit.findById(req.params.id)
    res.render('chooseoffers', {
        title: 'Игра началась ^_^',
        offer
    })
})

router.get('/deposit/:id', async (req, res) => {
    let offer = await Deposit.findById(req.params.id)
    res.render('chooseoffers', {
        title: 'Игра началась ^_^',
        offer,
        isDeposit: true
    })
})

router.post('/takecredit', async (req, res) => {
    let {id, amount, term} = req.body
    let credit = await Credit.findById(id)
    await req.person.addCredit(credit, amount, term)

    res.redirect('/')
})

router.post('/takedeposit', async (req, res) => {
    let {id, amount, term} = req.body
    let deposit = await Deposit.findById(id)
    await req.person.addDeposit(deposit, amount, term)

    res.redirect('/')
})

router.get('/addpayment', async (req, res) => {
    await req.person.addPayment()

    res.redirect('/')
})

router.get('/remittance/:id', async (req, res) => {
    let {id} = req.params
    
    let payment = req.person.offers.payment
    let idx = payment.findIndex(p => {
        return p.id.toString() ===  id.toString()
    })
    pay = payment[idx]
    res.render('remittance', {
        title: 'Перевод средств',
        pay,
        access: pay.amount > 0 ? true: false
    })
})
router.post('/remittance', async (req, res) => {
    let {sender, receiver, amount} = req.body
    // let receive = await Person.findOne({'id': receiver})
    let receive = await Person.findOne({'offers.payment._id': receiver})
    await req.person.doRemittance(sender, amount, true)
    await receive.doRemittance(receiver, amount, false)
    res.redirect('/')
})


module.exports = router