const express = require('express')
 
const routerUser = require('./route/user')

const routerSwiper = require("./route/swiper")

const routerShop = require('./route/shop')

const routerDetail = require('./route/detail')

const routerOrder = require('./route/order')

const configPath = require('./configPath')

const nunjucks = require('nunjucks')

const bodyParser = require('body-parser')



const app = express()


app.use('/public', express.static(configPath.publicPath))

app.use('/node_modules', express.static(configPath.nodeModulesPath))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(objMulter.any())
// parse application/json
app.use(bodyParser.json())

nunjucks.configure(configPath.viewsPath, {
	autoescape: true,
	express: app,
	noCache: true
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Content-Length, Authorization, yourHeaderFeild");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(routerUser)

app.use(routerSwiper)

app.use(routerShop)

app.use(routerDetail)

app.use(routerOrder)

app.listen(4000, () => {
	console.log('2000')
})




// const path = require('path')
// console.log(path.join(__dirname, './public'))

// const app = express()

// app.get('/', (req, res, next) => {
// 	res.end('hell wrold!')
// })

// app.use((req,res,next) => {
// 	// res.end('404...')
// 	try{
// 		JSON.parse('{4546}')
// 	}catch(e){
// 		//TODO handle the exception
// 		next(e)
// 	}
	
// })

// app.use((err, req, res, next) => {
// 	// res.writeHead(500, {})
// 	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
// 	res.end('500服务器正忙....')
// })