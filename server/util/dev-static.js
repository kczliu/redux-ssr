const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const reactSSR = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')

const Module = module.constructor

const getTemplate = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:8888/public/index.html')
            .then(res=>{
                resolve(res.data)
            })
            .catch(reject)
    })
}
let serverBundle
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({},(err,stats)=>{
    if(err) throw err;



    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,'utf-8')
    const m = new Module()
    m._compile(bundle,'server-entry.js')
    serverBundle = m.exports.default
})
module.exports= function (app) {
    app.use('/public',proxy({
        target:"http://localhost:8888"
    }))
    app.get('*',(req,res)=>{
        getTemplate().then(resp=>{
            const content = reactSSR.renderToString(serverBundle)
            res.send(resp.replace('<!--app-->',content))
        })
    })
}