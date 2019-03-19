import ReactDOM from 'react-dom'
import React from 'react'
import App from './client/views/app.js'
import {AppContainer} from 'react-hot-loader'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'mobx-react'
import appState from './client/store/store'
const root = document.getElementById('root')
const render = (Component)=>{
    ReactDOM.hydrate(
        <AppContainer>
            <Provider appState = {appState}>
                <Router>
                    <Component></Component>
                </Router>
            </Provider>

        </AppContainer>,
        root
    )
}
render(App)

if(module.hot){
    module.hot.accept("./APP.js",()=>{
        const NextApp = require('./APP.js').default
        render(NextApp)
    })
}