const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const orderModel = require('../db/orderModel')

const mongoosePath = require('../db/connectPath')
//获取订单列表
router.use('/admin/order/list', (req, res, next) => {
    if(global.adminState != true){
        res.redirect('/admin/user/login')
        return;
    }
    const page = Number.parseInt(req.query.page, 10) || 1
    console.log(page)
    try{
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        orderModel.find()
        .skip((page - 1) * 3)
        .limit(3)
        .exec((err, orderlist) => {
            if (err) {
                throw err
            } else {
                orderModel.count((err, count) => {
                    if (err) {
                        throw err;
                    } else {
                        const totalPage = Math.ceil(count / 3);
                        res.render('orderlist.html', {
                            orderlist,
                            totalPage,
                            page
                        })
                    }
                })
            }
        })
    }catch(e) {
        res.json({
            code: 500,
            msg:"服务器正忙......"
        })
    }
})
router.use('/admin/order/lists', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10) || 1
    console.log(page)
    try{
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        orderModel.find()
        .skip((page - 1) * 3)
        .limit(3)
        .exec((err, orderlist) => {
            if (err) {
                throw err
            } else {
                orderModel.count((err, count) => {
                    if (err) {
                        throw err;
                    } else {
                        const totalPage = Math.ceil(count / 3);
                        res.json({
                            orderlist,
                            totalPage,
                            page
                        })
                    }
                })
            }
        })
    }catch(e) {
        res.json({
            code: 500,
            msg:"服务器正忙......"
        })
    }
})
//查询订单
router.use('/admin/order/search', async(req, res, next) => {
     const { orderId } = req.query
     console.log(orderId)
    try{
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        const orderlist = await orderModel.find({"_id": orderId})
        console.log(orderlist)
        if(orderlist){
            res.render('orderSearch.html', {
                orderlist
            })
        }
    }catch(e) {
        res.json({
            code: 500,
            msg:"服务器正忙......"
        })
    }
})
//删除订单
router.use('/admin/order/delete/:id', async (req,res) => {
    const id = req.params.id
     console.log(id)
    try{
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        const orderlist = await orderModel.findByIdAndRemove({"_id": id})
        res.redirect('/admin/order/list')
    }catch(e) {
        res.json({
            code: 500,
            msg:"服务器正忙......"
        })
    }
})
module.exports = router