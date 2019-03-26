import ReactDOM from 'react-dom'
import React from 'react'
import App from './client/views/app.js'
import {AppContainer} from 'react-hot-loader'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'mobx-react'
import AppState from './client/store/app-state'

import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import {lightBule,pink} from '@material-ui/core/colors'

const root = document.getElementById('root')
const initailState = window.__INITIAL_STATE__ ||{}

const theme = createMuiTheme({
    palette:{
        primary:pink,
        accent:lightBule,
        type:"light"
    }
})

const createApp = (TheApp)=>{
    class Main extends React.Component{
        componentDidMount(){
            const jssStyles = document.getElementById('js-server-side')
            if(jssStyles && jssStyles.parentNode){
                jssStyles.parentNode.removeChild(jssStyles)
            }
        }
        render(){
            return <TheApp />
        }
    }
    return Main
}
const render = (Component)=>{
    ReactDOM.hydrate(
        <AppContainer>
            <Provider appState = {new AppState(initailState.appState)}>
                <Router>
            <MuiThemeProvider theme={theme}>
                <Component></Component>
            </MuiThemeProvider>

                </Router>
            </Provider>

        </AppContainer>,
        root
    )
}
render(createApp(App))

if(module.hot){
    module.hot.accept("./APP.js",()=>{
        const NextApp = require('./APP.js').default
        render(createApp(NextApp))
    })
}