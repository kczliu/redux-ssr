const ejs = require('ejs')
const reactSSR = require('react-dom/server')
const asyncBootstrap = require('react-async-bootstrapper')

/*material-ui*/
const SheetsRegistry = require('react-jss').SheetsRegistry
const create= require('jss').create
const preset= require('jss-preset-default').default
const createMuiTheme= require('@material-ui/core/styles').createMuiTheme
const createGenerateClassName= require('@material-ui/core/styles/createGenerateClassName').default
const colors = require('@material-ui/core/colors')
/*material-ui*/

const getStoreState = (stores)=>{
    return Object.keys(stores).reduce((result,storeName)=>{
        result[storeName] = stores[storeName].toJson()
        return result
    },{})
}

module.exports = (bundle,template,req,res)=>{
    return new Promise((resolve,reject)=>{
        /*material-ui*/
        const sheetsRegistry = new SheetsRegistry()
        const jss = create(preset())
        jss.options.createGenerateClassName = createGenerateClassName
        const theme = createMuiTheme({
            palette:{
                primary:colors.lightBule,
                accent:colors.pink,
                type:"light"
            }
        })
        /*material-ui*/
        const createStoreMap = bundle.createStoreMap
        const createApp = bundle.default
        const routerContext = {}
        const store = createStoreMap()
        const app = createApp(store,routerContext,req.url,sheetsRegistry,jss,theme)
         asyncBootstrap(app).then(()=>{

           if(routerContext.url){
               res.status(302).setHeader('Location',routerContext.url)
               res.end()
                return
           }
           const content = reactSSR.renderToString(app);
           const state = getStoreState(store)
           const html = ejs.render(template,{
               appString:content,
               initialState:JSON.stringify(state),
               materialClass:sheetsRegistry.toString()
           })
           res.send(html);
           resolve()
       })

        // res.send(resp.replace('<!--app-->',content));
    })
}