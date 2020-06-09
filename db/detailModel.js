const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)  

const Schema = mongoose.Schema

const detailSchema = new Schema({
    swiperImg: {
        type: Array,
        required: true
    },
    detailImg:{
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    oldPrice: {
        type: Number,
        min: 0
    },
    newPrice: {
        type: Number,
        min: 0
    },
    sellCount: {
        type: Number,
        min: 0
    },
    productParameter: {
        type: Array,
        required: true
    },
    storeInformation: {
        type: Object,
        required: true
    },
    shopId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    sever: {
        type: Object
    }
})

const detailModel = mongoose.model('Detail', detailSchema)

module.exports = detailModel

