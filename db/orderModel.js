const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true) 
const Schema = mongoose.Schema

const orderSchema = new Schema({
    sumPrice: {
        type: Number,
        min: 0,
        required: true
    },
    cartlist:{
        type: Array,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    sumCount: {
        type: Number,
        min: 0,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel