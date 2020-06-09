const accessKeyId = 'LTAI4Ftv8m7a4oDWR16X2rge';
const secretAccessKey = '5JW2r2iSuZOZXeKnnaVQgSkZctD2Pmk';
const SMSClient = require('@alicloud/sms-sdk')

//外部调用该方法
module.exports = function(req, res, next) {
  //随机产生4位数验证码
  let str1 = getNumber()
  //引入SDK
// accessKeyId /secretAccessKey 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAI4Ftv8m7a4oDWR16X2rge';
const secretAccessKey = '5JW2r2iSuZOZXeKnnaVQgSkZctD2Pmk';
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
        console.log(err);
    })
}
//生成  三位验证码  随机数
function getNumber(){
    let str = "";
    for(let i = 0; i < 4; i++){
        str+= Number.parseInt(Math.random() * 10)
    }
    return str
}
