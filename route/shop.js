const express = require('express')

const router = express.Router()

const mongoose = require('mongoose')

const shopModel = require('../db/shopModel')

const mongoosePath = require('../db/connectPath')

let multer = require('multer');
let fs = require("fs");
let path = require("path");

let upload = multer({
    dest: path.join(__dirname, '../public/upload')
})

//商品添加功能
router.post('/admin/shop/upload', upload.single('file'), function (req, res, next) {
    const title = req.body.title
    const price = req.body.price
    const classify = req.body.classify
    const types = req.body.types
    const filename = req.file.filename
    const imgName = "http://192.168.43.172:4000/public/upload/" + filename + '.' + req.file.originalname.split('\.')[1]
    console.log(imgName)

    fs.rename(req.file.path, req.file.path + '.' + req.file.originalname.split('\.')[1], err => {
        if (!err) {
            mongoose.connect(mongoosePath.url, mongoosePath.options)
            const shop = new shopModel({
                title,
                price,
                classify,
                types,
                img: imgName
            })
            shop.save((err, data) => {
                if (err) {
                    throw err
                } else {
                    console.log(data)
                    console.log("success")
                    res.redirect('/admin/shop/list?page=1')
                }
            })
        }
    })
});

//商品列表分页功能
router.use('/admin/shop/list', (req, res, next) => {
    if(global.adminState != true){
        res.redirect('/admin/user/login')
        return;
    }
    const page = Number.parseInt(req.query.page, 10) || 1
    // if(isNaN(page)) new Error("page is fail");
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    shopModel.find()
        .skip((page - 1) * 12)
        .limit(12)
        .exec((err, data) => {
            if (err) {
                throw err
            } else {
                if(data.length === 0) {
                    res.render("shopList.html")
                }
                shopModel.count((err, count) => {
                    if (err) {
                        throw err;
                    } else {
                        const totalPage = Math.ceil(count / 12);
                        if(page > totalPage){
                            return;
                        }
                        res.render("shopList.html", {
                            data,
                            page,
                            totalPage
                        })
                    }
                })
            }
        })
})

router.use('/admin/shop/lists', (req, res, next) => {
    const page = Number.parseInt(req.query.page, 10)
    // if(isNaN(page)) new Error("page is fail");
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    shopModel.find()
        .skip((page - 1) * 12)
        .limit(12)
        .exec((err, data) => {
            if (err) {
                throw err
            } else {
                shopModel.count((err, count) => {
                    if (err) {
                        throw err;
                    } else {
                        const totalPage = Math.ceil(count / 12);
                        res.send({
                            totalPage,
                            data,
                            page
                        })
                    }
                })
            }
        })
})
//商品搜索功能
router.use('/admin/shop/search', (req, res, next) => {
    //  console.log(req.query)
    const page = Number.parseInt(req.query.page, 10) || 1
    // console.log(page)
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    shopModel.find({ classify: req.query.classify })
        .skip((page - 1) * 4)
        .limit(4)
        .exec((err, data) => {
            if (err) {
                throw err
            } else {
                shopModel.find({ classify: req.query.classify })
                    .count((err, count) => {
                        if (err) {
                            throw err
                        } else {
                            const totalPage = Math.ceil(count / 4)
                            res.render("shopSearchList.html", {
                                totalPage,
                                data,
                                page,
                                classify: req.query.classify
                            })
                        }
                    })
            }
        })

})

router.use('/admin/shop/searchs', (req, res, next) => {
    //  console.log(req.query)
    const page = Number.parseInt(req.query.page, 10) || 1
    // console.log(page)
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    shopModel.find({ classify: req.query.classify })
        .skip((page - 1) * 4)
        .limit(4)
        .exec((err, data) => {
            if (err) {
                throw err
            } else {
                shopModel.find({ classify: req.query.classify })
                    .count((err, count) => {
                        if (err) {
                            throw err
                        } else {
                            const totalPage = Math.ceil(count / 4)
                            res.send({
                                totalPage,
                                data,
                                page,
                                classify: req.query.classify
                            })
                        }
                    })
            }
        })

})
//商品修改功能
router.use('/admin/shop/update/:id', (req, res, next) => {
    console.log(req.params.id)
    mongoose.connect(mongoosePath.url, mongoosePath.options)

    shopModel.findById({ _id: req.params.id }, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('shopEdit.html', { data })
        }
    })
})
//商品修改功能
router.use('/admin/shop/update', (req, res, next) => {
    // console.log(req.files)
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    shopModel.findByIdAndUpdate(req.body._id, {
        title: req.body.title,
        img: req.body.img,
        price: req.body.price,
        classify: req.body.classify,
        types: req.body.types,
        path: req.body.path
    }, (err, data) => {
        if (err) {
            console.log('更新失败')
        } else {
            res.status(200).redirect('/admin/shop/list?page=1')
        }
    })
})

router.use('/admin/shop/add', (req, res, next) => {
    res.render('shopAdd.html')
})
//商品删除功能
router.use('/admin/shop/delete/:id', (req, res, next) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    shopModel.findOne({ _id: req.params.id }, (err, result) => {
        console.log(result.img,result)
        if (!err) {
            const paths = '.' + result.img.split(4000)[1]
            console.log(paths)
           
            shopModel.findByIdAndRemove(result._id, (err, data) => {
                if (!err) {
                    fs.unlink(paths, (err) => {
                        if (err) {
                            throw err;
                        } else {
                            res.redirect('/admin/shop/list?page=1')
                        }
                    })
                }
            })
        }
    })
})

/********************************************************** 前台路由 **********************************************************/
router.use('/shop/list', (req, res, next) => {
    const { page, type} = req.query
    // console.log(page, type)
    if(type == 'pop'){
       
       shopModel.find({types:"流行"})
                .skip((page - 1)*4)
                .limit(4)
                .exec((err, result) => {
                    if(err){
                        throw err
                    }else {
                        if(result.length == 0){
                            res.json({
                                msg: '已无更多数据......'
                            })
                        }else {
                            res.send({
                                result,
                                msg: '已加载更多数据......'
                            })
                        }   
                    }
                })
    }else if(type === 'new' ){
        shopModel.find({types:"新款"})
                .skip((page - 1)*4)
                .limit(4)
                .exec((err, result) => {
                    if(err){
                        throw err
                    }else {
                        if(result.length == 0){
                            res.json({
                                msg: '已无更多数据......'
                            })
                        }else {
                            res.send({
                                result,
                                msg: '已加载更多数据......'
                            })
                        } 
                    }
                })
    }else if(type == 'tui'){
        shopModel.find({types:"推荐"})
                .skip((page - 1)*4)
                .limit(4)
                .exec((err, result) => {
                    if(err){
                        throw err
                    }else {
                        if(result.length == 0){
                            res.json({
                                msg: '已无更多数据......'
                            })
                        }else {
                            res.send({
                                result,
                                msg: '已加载更多数据......'
                            })
                        } 
                    }
                })
    }
})

router.use('/shop/recommond/list', (req, res, next) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)
                  let shop1, shop2;
                  shopModel.find({classify: '手机'})
                           .limit(2)
                           .exec((err, data) => {
                               shop1 = data
                               shopModel.find({classify: '电脑'})
                                        .limit(2)
                                        .exec((err, result) => {
                                            console.log(result)
                                            shop2 = [...data, ...result]
                                            res.json(shop2)
                                        })
                           })
})

router.use("/category", async (req, res, next) => {
    const { type } = req.query
  
    try{
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        const lists = await shopModel.find({classify: type})
        console.log(lists)
        if(lists){
            res.json({
                code: 200,
                lists,
                msg:"ok"
            })
        }
    }catch(err) {
        res.json({
            code: 500,
            msg: '服务器正忙......'
        })
    }
})

module.exports = router
