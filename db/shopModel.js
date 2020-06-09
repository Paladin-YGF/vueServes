const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true) 
const Schema = mongoose.Schema

const shopSchema = new Schema({
    price: {
        type: String,
        required: true,
        min: 0
    },
    title: {
        type: String,
        required: true,
        default: ''
    },
    classify: {
        type: String,
        required: true,
        default: "手机"
    },
    types: {
        type: String,
        required: true,
        default: "推荐"
    },
    img: {
        type: String,
        required: true
    },
    path: {
        type: String,
        default: '/detail'
    }
})
const shopModel = mongoose.model('Shop', shopSchema)

module.exports = shopModel