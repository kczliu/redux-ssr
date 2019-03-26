import React,{Component} from 'react'
import Route from '../config/router'

import AppBar from './layout/app-bar'
export default  class App extends Component {
    render(){
        return[
            <AppBar></AppBar>,
            <Route></Route>
            ]
    }
}