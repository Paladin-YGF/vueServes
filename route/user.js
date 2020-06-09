const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')

const userModel = require('../db/userModel')
const orderModel = require('../db/orderModel')

const mongoosePath = require('../db/connectPath')

const mongoose = require('mongoose')

const jwt = require("jsonwebtoken")

const multer = require('multer')

const path = require('path')
const fs = require('fs')

let upload = multer({
    dest: path.join(__dirname, '../public/upload')
})

//引入SDK
const SMSClient = require('@alicloud/sms-sdk')

const accessKeyId = 'LTAI4Ftv8m7a4oDWR16X2rge';
const secretAccessKey = '5JW2r2iSuZOZXeKnaVQgSkZctD2Pmk';

/*************************************** 后台用户路由设计 ***************************************/

router.use('/admin/login', (req, res, next) => {
    res.render('login.html')
})

router.use('/admin/user/login', (req, res, next) => {
    const { username, password } = req.body
    console.log(username, password)
    if(username != 'admin' || password != "admin"){
        res.render('login.html', {
            msg: '用户名或用户密码输入不正确!!!',
            code: 401
        })
    }else {
        global.adminState = true
        res.redirect('/admin/user/list')
    }
})

router.use('/admin/user/list', (req, res, next) => {
    if(global.adminState != true){
        res.redirect('/admin/user/login')
        return;
    }
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    userModel.find((err, data) => {
        if (err) {
            throw err;
        } else {

            // res.json(data)
            mongoose.disconnect()

            res.render('userList.html', { data })
        }
    })
})

router.use('/admin/user/delete/:id', (req, res, next) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    userModel.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.redirect('/admin/user/list')
        }
    })
})

router.use('/admin/user/update/:id', (req, res, next) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)

    userModel.findById({ _id: req.params.id }, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('userEdit.html', { data })
        }
    })
})
router.use('/admin/user/update', (req, res, next) => {
    // console.log(req.files)
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    userModel.findByIdAndUpdate(req.body._id, {
        username: req.body.username,
        password: req.body.password,
        disable: req.body.disable
    }, (err, data) => {
        if (err) {
            console.log('更新失败')
        } else {
            //     console.log(data)
            //    console.log('更新成功')
            //    mongoose.disconnect()
            res.redirect('/admin/user/list')
        }
    })
})


router.use('/admin/user/search', (req, res, next) => {
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    userModel.find({ username: req.query.username }, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('userList.html', { data })
        }
    })
})

/**************************************************************       前台路由     **************************************************************/

router.use('/user/getCode', async (req, res, next) => {
    let str1 = getNumber()
  // accessKeyId /secretAccessKey 根据实际申请的账号信息进行替换
  const accessKeyId = 'LTAI4Ftv8m7a4oDWR16X2rge';
  const secretAccessKey = '5JW2r2iSuZOZXeKnaVQgSkZctD2Pmk';
  //初始化sms_client
  let smsClient = new SMSClient({accessKeyId, secretAccessKey});
      //发送短信
      smsClient.sendSMS({
          PhoneNumbers: req.query.number,//必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为：国际区号+号码，如“85200000000”
          //以下短信签名和模板填入自己申请的即可
          SignName: '小码购物',//必填:短信签名-可在短信控制台中找到
          TemplateCode: 'SMS_186945334',//必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
          TemplateParam: `{"code":'${str1}'}`//可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
      }).then(function (data) {
          let {Code}=data
          if (Code === 'OK') {
              //这里返回的数据自行确定
              let obj={
                  msg:"ok",
                  code:str1  //str1是自行产生的手机验证码，返回到前端以做验证
              }
              res.send(obj);
          }
      },function(err) {
          let obj={
              msg:"fail"
          }
          res.send(obj);
      })
})


router.use('/user/register', async (req, res, next) => {
    const { username, password } = req.query
    const salt = bcrypt.genSaltSync(10)
    const passwords = bcrypt.hashSync(password,salt)
    const user = new userModel({
        username,
        password: passwords
    })

    mongoose.connect(mongoosePath.url, mongoosePath.options)
    const users = await userModel.find({username})
    if(users.length == 1){
            res.json({
                "msg": "用户注册已存在！",
                "status": 401
            })
    }else{
        const userSave = await user.save()
        if (userSave) {
            res.status(200).json({
                "msg": "用户注册成功！",
                "status": 200
            })
        }
    }
    
})

router.use('/user/login', async (req, res, next) => {
    const { username, password } = req.query
    mongoose.connect(mongoosePath.url, mongoosePath.options)
    const user = await userModel.findOne({ username });
    if (!user) {
        res.json({
            "msg": "用户不存在！",
            "status": "401"
        })
    } else {
        //密文校验
        const isPasswrd = bcrypt.compareSync(password, user.password)
        if (!isPasswrd) {
            return res.json({
                "msg": "密码错误！",
                code: 404
            })
        } else {
            /*
                第一个是载荷，用于编码后存储在 token 中的数据，也是验证 token 后可以拿到的数据；
                第二个是密钥，可自己定义的，验证的时候也是要相同的密钥才能解码；
                第三个是options，可以设置 token 的过期时间。
            */
            const token = jwt.sign({
                id: String(user._id)
            }, "myToken")
            return res.status(200).json({
                "msg": "用户已登录......",
                user,
                token
            })
        }
    }
})
//中间件：
    const authr = async (req, res, next) => {
        const raw = String(req.query.token)
        if(raw == 'undefined' || raw == '') {
            res.json({
                msg: '用户未登录，请登录......',
                code: 404
            })
            return;
        }
        const { id } = jwt.verify(raw, 'myToken')
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        const user = await userModel.findById({ _id: id})
        req.user = user
        next()
    }
router.use('/user/profile', authr, async (req, res, next) => {
    // console.log(req.headers.authorization)
    const user = req.user
    if(user){
        res.send({
            'msg': "用户已登录!",
            "code": "200",
            user
        })
    }else {
        res.send({
            'msg': '用户未登录',
            "code": '422'
        })
    }
})

router.post('/user/userEdit', upload.single('file'), async (req, res, next) => {
    const { username, userSex, id } = req.body
    if(req.file != undefined) {
        const filename = req.file.filename
         const img = "http://192.168.43.172:4000/public/upload/" + filename + '.' + req.file.originalname.split('\.')[1]
         mongoose.connect(mongoosePath.url, mongoosePath.options)
         fs.rename(req.file.path, req.file.path + '.' + req.file.originalname.split('\.')[1], async (err) => {       
            if(!err){
                try{
                    const userUpdate = await userModel.findByIdAndUpdate({_id: id}, {
                        username,
                        sex: userSex, 
                        img})
                    if(userUpdate){
                        res.json({
                            code: 200,
                            msg:'用户信息修改成功'
                        })
                    }
                   }catch(e){
                   }
            }
        })
    

    }else {
        mongoose.connect(mongoosePath.url, mongoosePath.options)
        try{
            const userUpdate = await userModel.findByIdAndUpdate({_id: id}, {
                username,
                sex: userSex})
            if(userUpdate){
                res.json({
                    code: 200,
                    msg:'用户信息修改成功'
                })
            }
           }catch(e){
                console.log(e)
           }
    }
    
})

router.use('/user/rePassword',  (req, res, next) => {
     const { id, password } = req.query    
     mongoose.connect(mongoosePath.url, mongoosePath.options)
     const salt = bcrypt.genSaltSync(10)
     const passwords = bcrypt.hashSync(password,salt)
     userModel.findByIdAndUpdate({ _id: id }, {password: passwords}, (err, data) => {
         if(!err){
             res.json({
                 msg: '密码修改成功！',
                 code: 200
             })
         }else{
            res.json({
                msg: '服务器正忙......',
                code: 500
            }) 
         }
     })
    
})

    router.use('/user/order', async (req, res, next) => {
        const { user, sumPrice, sumCount, cartlist } = req.query
        console.log(sumCount,sumPrice,req.query)
        for(let i = 0; i < cartlist.length; i++){
            cartlist[i] = JSON.parse(cartlist[i])
        }
        const order = new orderModel({
            user: JSON.parse(user),
            sumPrice,
            sumCount,
            cartlist: cartlist,
            userId: JSON.parse(user).id
        })
        try{
            mongoose.connect(mongoosePath.url, mongoosePath.options)
            console.log(order,55555)
            const orderInfo = await order.save()
            // console.log(orderInfo,123)
            if(orderInfo){
                res.json({
                    code: 200,
                    order,
                    msg: '订单提交成功!',
                    cartlist
                })
            }
        }catch(err) {
            res.json({
                msg: '服务器正忙......',
                code: 500
            })
        }
    })
    router.use('/user/orderList', async(req, res, next) => {
        // console.log(req.query.id)
            const { id } = req.query
        try{
            mongoose.connect(mongoosePath.url, mongoosePath.options)
            const orderList = await orderModel.find({userId: id})
            res.json({
                orderList,
                code: 200
            })
        }catch(err){
            res.json({
                msg: '服务器正忙......',
                code: 500
            })
        }
    })

    router.use('/user/loginout', async(req, res, next) => {
        const myCartList = req.query.myCartList
        const id = req.query.id
        try {
            mongoose.connect(mongoosePath.url, mongoosePath.options)
            const user = await userModel.findByIdAndUpdate({_id: id}, {myCartList: JSON.parse(myCartList)})
            console.log(JSON.parse(myCartList), user)
            if(user){
                res.json({
                    code: 200,
                    msg: '用户退出登录......'
                })
            }
        }catch(err){
            res.json({
                code: 500,
                msg: '服务器正忙......'
            })
        }
    })

    router.use('/admin/user/loginout', (req,res,next) => {
        if(global.adminState == true){
            global.adminState = false
            res.redirect('/admin/user/login')
            return;
        }
    })
//生成  三位验证码  随机数
function getNumber(){
    let str = "";
    for(let i = 0; i < 4; i++){
        str+= Number.parseInt(Math.random() * 10)
    }
    return str
}


module.exports = router