const {Schema, model} = require('mongoose')


let Deposit = new Schema({
    name: {
        type: String,
        required: true
    },
    amountFrom: {
        type: Number,
        required: true
    },
    amountTo: {
        type: Number,
        required: true
    },
    percent: {
        type: Number,
        required: true
    },
    termFrom: {
        type: Number,
        required: true
    },
    termTo: {
        type: Number,
        required: true
    },
    refill: {
        type: Boolean,
        required: true
    },
    takeAway: {
        type: Boolean,
        required: true
    }
})

module.exports = model('Deposit', Deposit)