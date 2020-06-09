const mongoose = require('mongoose')

const detailModel = require("../db/detailModel")

const mongoosePath = require("../db/connectPath")

const express = require('express')

const router = express.Router()

router.use('/detail', async (req, res, next) => {
    const { id } = req.query
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    const detailInfo = await detailModel.findOne({ "shopId": id })
    console.log(id, detailInfo)
    if (detailInfo) {
        res.json({
            data: detailInfo
        })
    } else {
        res.send({
            code: 500
        })
    }
})
//获取商品详情列表
router.use('/admin/shopInfo/list', (req, res, next) => {
    if (global.adminState != true) {
        res.redirect('/admin/user/login')
        return;
    }
    const page = Number.parseInt(req.query.page, 10) || 1
    try {
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        const detail = detailModel.find()
            .skip((page - 1) * 5)
            .limit(5)
            .exec((err, data) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: "服务器正忙......"
                    })
                } else {
                    if (data.length === 0) {
                        res.render("detailList.html")
                    }
                    detailModel.count((err, count) => {
                        if (err) {
                            throw err;
                        } else {
                            const totalPage = Math.ceil(count / 5);
                            if (page > totalPage) {
                                return;
                            }
                            res.render("detailList.html", {
                                data,
                                page,
                                totalPage
                            })
                        }
                    })
                }
            })
    } catch (err) {
        res.json({
            code: 500,
            msg: "服务器正忙......"
        })
    }
})

router.use('/admin/shopInfo/lists', (req, res, next) => {
    if (global.adminState != true) {
        res.redirect('/admin/user/login')
        return;
    }
    const page = Number.parseInt(req.query.page, 10) || 1
    try {
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        const detail = detailModel.find()
            .skip((page - 1) * 5)
            .limit(5)
            .exec((err, data) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: "服务器正忙......"
                    })
                } else {
                    if (data.length === 0) {
                        res.render("detailList.html")
                    }
                    detailModel.count((err, count) => {
                        if (err) {
                            throw err;
                        } else {
                            const totalPage = Math.ceil(count / 5);
                            if (page > totalPage) {
                                return;
                            }
                            res.json({
                                data,
                                page,
                                totalPage
                            })
                        }
                    })
                }
            })
    } catch (err) {
        res.json({
            code: 500,
            msg: "服务器正忙......"
        })
    }
})
//查询对应商品详情
router.use('/admin/shopInfo/search', async(req, res, next) => {
    const { detailId } = req.query
    console.log(detailId,req.query)
   try{
       mongoose.connect(mongoosePath.url, mongoosePath.options)
       const data = await detailModel.find({"shopId": detailId})
       console.log(data)
       if(data){
           res.render('detailSearch.html', {
               data
           })
       }
   }catch(e) {
       res.json({
           code: 500,
           msg:"服务器正忙......"
       })
   }
})
//删除对应商品详情
router.use('/admin/detail/delete/:id', async(req, res, next) => {
    const { id } = req.params
    console.log(id,123)
    try {
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        let detail = await detailModel.findByIdAndRemove({"_id": id})
        console.log(detail,159)
        if(detail){
            res.redirect('/admin/shopInfo/list')
        }
    }catch(e){
        res.json({
            code: 500,
            msg:"服务器正忙......"
        })
    }
})

module.exports = router