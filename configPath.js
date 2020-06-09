const path = require('path')

console.log(path.join(__dirname, 'views'))
module.exports = {
    viewsPath: path.join(__dirname, 'views'),
    nodeModulesPath: path.join(__dirname, 'node_modules'),
    publicPath: path.join(__dirname, 'public')
}