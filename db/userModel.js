const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true) 
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    disable: {
        type: Boolean,
        default: false
    },
    img:{
        type: String,
        default: ''
    },
    sex: {
        type: String,
        default: '男'
    },
    myCartList:{
        type: Array,
        default:[]
    }
})

const user = mongoose.model('User', userSchema)

module.exports = user
