const {Router} = require('express')
const dateMW = require('../middleware/dateMW')

const router = Router()

// Просмотр своего профиля
router.get('/', dateMW, async (req, res) => {
    let person = await req.person.populate('personalData')
    
    res.render('profile', {
        layout: 'cabinet',
        title: 'Личный кабинет',
        person: person.personalData
    })
})


router.get('/mycredit', async (req, res) => {
    let person = await req.person.populate('offers.credit.rate')
    let credits = person.offers.credit
    res.render('mycredit', {
        layout: 'cabinet',
        title: 'Мои кредиты',
        credits
    })
})


router.get('/mydeposit', async (req, res) => {
    let person = await req.person.populate('offers.deposit.rate')
    let deposits = person.offers.deposit
    res.render('mydeposit', {
        layout: 'cabinet',
        title: 'Мои вклады',
        deposits
    })
})

router.get('/mypayment', async (req, res) => {
    let person = await req.person
    let payment = person.offers.payment
    res.render('mypayment', {
        layout: 'cabinet',
        title: 'Мои вклады',
        payment
    })
})

module.exports = router