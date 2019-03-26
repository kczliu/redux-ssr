import React from 'react'
import {StaticRouter} from 'react-router-dom'
import {Provider, useStaticRendering} from 'mobx-react'
import App from './views/app.js'

import {createStoreMap} from './store/store'

/*material-ui*/

import {JssProvider} from 'react-jss'
import {MuiThemeProvider} from '@material-ui/core/styles'

/*material-ui*/

useStaticRendering(true)
export default (stores,routerContext,url,sheetsRegistry,jss,theme)=>{
    return(
        <Provider {...stores}>
            <StaticRouter context={routerContext} location={url}>
                <JssProvider registry={sheetsRegistry} jss={jss}>
                    <MuiThemeProvider theme={theme} >
                        <App></App>
                    </MuiThemeProvider>
                </JssProvider>

            </StaticRouter>
        </Provider>

    )
}

export {createStoreMap}