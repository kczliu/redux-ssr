const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const reactSSR = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server')
const ejs = require('ejs')
const asyncBootstrap = require('react-async-bootstrapper')
const Module = module.constructor
const serverRender = require('./server-render')

const getTemplate = ()=>{
    return new Promise((resolve,reject)=>{
        axios.get('http://localhost:8888/public/server.ejs')
            .then(res=>{
                resolve(res.data)
            })
            .catch(reject)
    })
}


let serverBundle, createStoreMap
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
    //serverBundle = m.exports.default
    //createStoreMap = m.exports.createStoreMap
    serverBundle = m.exports

})
/*
const getStoreState = (stores)=>{
    return Object.keys(stores).reduce((result,storeName)=>{
        result[storeName] = stores[storeName].toJson()
        return result
    },{})
}*/

module.exports= function (app) {
    app.use('/public',proxy({
        target:"http://localhost:8888"
    }))
    app.get('*',(req,res)=>{
        getTemplate().then(resp=>{
            serverRender(serverBundle,resp,req,res)
         /*  const routerContext = {}
           const store = createStoreMap()
           const app = serverBundle(store,routerContext,req.url)
          asyncBootstrap(app)
              .then(()=>{

              if(routerContext.url){
                  res.status(302).setHeader('Location',routerContext.url)
                  res.end()
                  return
              }

                  const content = reactSSR.renderToString(app);
              const state = getStoreState(store)
              const html = ejs.render(resp,{
                  appString:content,
                  initialState:JSON.stringify(state)
              })
              res.send(html);
          })*/

           // res.send(resp.replace('<!--app-->',content));
        })
    })
}