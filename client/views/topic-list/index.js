import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {observer,inject} from 'mobx-react'
@inject('appState') @observer
export default  class TopicList extends Component {
    changeName=(e)=>{
        this.props.appState.changeName(e.target.value)
    }
    reset=()=>{
        this.props.appState.reset()
    }
    add1=()=>{
        this.props.appState.add1()
    }
    add2=()=>{
        this.props.appState.add2()
    }
    add3=()=>{
        this.props.appState.add3()
    }

    render(){
        return(
            <div>
                <input type="text" readOnly value={this.props.appState.count1} /> <button onClick = {this.add1}>add</button>
                <br/>
                <input type="text" readOnly value={this.props.appState.count2} /> <button onClick = {this.add2}>add</button>
                <br/>
                <input type="text" readOnly value={this.props.appState.count3} /> <button onClick = {this.add3}>add</button>
                <br/>
                <input type="text"  value={this.props.appState.total} />

                <button onClick = {this.reset}>reset</button>


                <div>{this.props.appState.msg}</div>
            </div>
        )
    }
}

TopicList.propTypes={
    appState:PropTypes.object.isRequired
}