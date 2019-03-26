const express = require('express')
//const ReactSSR = require('react-dom/server')
const serverRender = require('./util/server-render')
const bodyParser = require('body-parser')
const session = require('express-session')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const isDev = process.env.NODE_ENV == "development"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
    maxAge:10*60*1000,
    name:'liujing',
    resave:false,
    saveUninitialized:false,
    secret:"dgsgasas"
}))
app.use(favicon(path.join(__dirname,'../sc.ico')))

app.use('/api/user',require('./util/login'))
app.use('/api',require('./util/proxy'))


if(!isDev){
    /*    const serverEntry = require('../dist/server-entry.js').default
        const template = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
        app.use('/public',express.static(path.join(__dirname,"../dist")))
        app.get('*',(req, res)=>{
            const appString = ReactSSR.renderToString(serverEntry)
            res.send(template.replace("<!--app-->",appString))
        })*/
    const serverEntry = require('../dist/server-entry.js')
    const template = fs.readFileSync(path.join(__dirname,'../dist/server.ejs'),'utf8')
    app.use('/public',express.static(path.join(__dirname,"../dist")))
    app.get('*',(req, res,next)=>{
        serverRender(serverEntry,template,req,res)
    })
}else{
    const devStatic = require('./util/dev-static')
    devStatic(app)
}
app.use((error,req,res,next)=>{
    console.log(err)
   res.status(500).send(error)
})

app.listen(3333,()=>{
    console.log("server is load")
})