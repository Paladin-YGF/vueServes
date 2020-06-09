const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const swiperModel = require('../db/swiperModel')

const mongoosePath = require('../db/connectPath')

router.use('/swiper/list', (req, res) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    swiperModel.find((err, data) => {
        if(err){
            throw err;
        }else {
            res.json(data)
        }
    })
})


router.use('/swiper/add', (req, res) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    swiperModel.find({shopName: newSwiper.shopName},(err, data) => {
        console.log(data)
        console.log(data.shopId)
        if(data.length === 0) {
            console.log(123)
            newSwiper.save((err, data) => {
                if(!err){
                    console.log(data)
                    
                }
            })
        }
    }) 
   
})

/*****    后台路由      **** */
router.use('/admin/swiper/list', (req, res) => {
    if(global.adminState != true){
        res.redirect('/admin/user/login')
        return;
    }
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    swiperModel.find((err, data) => {
        if(err){
            throw err;
        }else {
            res.render("swiperList.html",{data})
        }
    })
})

router.use('/admin/swiper/update/:id', (req, res) => {
    // console.log(req.params.id)
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    swiperModel.findById({_id: req.params.id}, (err, data) => {
        // console.log(data)
        if(err) {
            throw err
        }else {
            res.render('swiperEdit.html', {data})
        }
    })
})

router.use('/admin/swiper/update', (req, res) => {
    // console.log(req.params.id)
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    swiperModel.findByIdAndUpdate(req.body._id,{
        shopName: req.body.shopName,
        path: req.body.path,
        imgSrc: req.body.imgSrc
    },  (err,data) => {
        if(err) {
            console.log('更新失败')
        } else {
        //     console.log(data)
        //    console.log('更新成功')
        //    mongoose.disconnect()
           res.redirect('/admin/swiper/list')
        }
    })
})

router.use('/admin/swiper/delete/:id', (req, res, next) => {
    mongoose.connect(mongoosePath.url,mongoosePath.options)
    swiperModel.findByIdAndRemove(req.params.id,(err, data) => {
        if(!err) {
            res.redirect('/admin/swiper/list')
        }
    })
})








module.exports = router