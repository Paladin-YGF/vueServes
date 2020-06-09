const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true) 
const Schema = mongoose.Schema

const swiperSchema = new Schema({
    imgSrc: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
})

const swiper = mongoose.model('swiper', swiperSchema)

module.exports = swiper