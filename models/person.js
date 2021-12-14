const {Schema, model} = require('mongoose')

let Person = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    personalData: {
        type: Schema.Types.ObjectId,
        ref: 'PersonalData',
        require: true},
    offers: {
        credit: [
            {
                rate: {
                    type: Schema.Types.ObjectId,
                    ref: 'Credit',
                    required: true},
                term: {
                    type: Number
                },
                date: {
                    type: Date,
                    default: Date.now()
                },
                amount: {
                    type: Number
                },
                pay: {
                    type: Number
                },
                remain: {
                    type: Number
                }
            }
        ],
        deposit: [
            {
                rate: {
                    type: Schema.Types.ObjectId,
                    ref: 'Deposit',
                    required: true},
                term: {
                    type: Number
                },
                date: {
                    type: Date,
                    default: Date.now()
                },
                amount: {
                    type: Number
                }
            }
        ],
        payment: [
            {
                date: {
                    type: Date,
                    default: Date.now()
                },
                amount: {
                    type: Number,
                    default: 0
                }
            }
        ]
    }
})


Person.methods.addCredit = function (offer, amount, term) {
    let credit = [...this.offers.credit]
    let percent = offer.percent
    let pay = parseInt(amount*(percent/100)/(1-(1/(1+percent/100)**term)))

    credit.push({
        rate: offer._id,
        term,
        amount,
        pay,
        remain: amount
    })
    this.offers.credit = credit
    return this.save()
}

Person.methods.addDeposit = function (offer, amount, term) {
    let deposit = [...this.offers.deposit]

    deposit.push({
        rate: offer._id,
        term,
        amount
    })

    this.offers.deposit = deposit
    return this.save()
}

Person.methods.addPayment = function () {
    let payment = [...this.offers.payment]

    payment.push({})

    this.offers.payment = payment
    return this.save()
}

Person.methods.doRemittance = function (id, amount, send) {
    try{
        let payment = [...this.offers.payment]
        let idx = payment.findIndex(p => {
            return p.id.toString() ===  id.toString()
        })
    
        if (send){
            payment[idx].amount = payment[idx].amount - amount
        } else {
            payment[0].amount = payment[0].amount + amount
        }
        this.offers.payment = payment
        return this.save()
    } catch (error) {
        console.log(error)
    }
    

    
}

module.exports = model('Person', Person)
