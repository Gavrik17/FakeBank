const {Schema, model} = require('mongoose')

let personalData = new Schema({
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    patronymic: {
        type: String,
        required: true
    },
    dateBirth:{
        type: Date,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pasport: {
        type: String,
        required: true
    },
    pasportDate: {
        type: Date,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    key: {
        type: String
    }
})

module.exports = model('PersonalData', personalData)