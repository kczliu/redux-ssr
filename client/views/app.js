import React,{Component} from 'react'
import Route from '../config/router'
import {Link} from 'react-router-dom'
export default  class App extends Component {
    render(){
        return[
            <div>this is ssr</div>,
            <div>
                <Link to='/list'>list</Link>
                <Link to='/detail'>detail</Link>
            </div>,
            <Route></Route>
            ]
    }
}