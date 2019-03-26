import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {observer,inject} from 'mobx-react'

/*import Helmmet from 'react-helmet'*/


import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import Container from '../layout/container'
import TopicListItem from './list-item'


@inject('appState') @observer
export default  class TopicList extends Component {
    constructor(){
        super()
       this.state={
            tabIndex:0
       }
    }

    changeTab=(e,index)=>{
        this.setState({
            tabIndex:index
        })
    }

    listItemClick=()=>{

    }

/*    componentWillMount(){
        setTimeout(()=>{
            this.props.appState.count =3
        })
    }*/
    bootstrap(){
        return new Promise(resolve=>{
            setTimeout(()=>{
                this.props.appState.count =3
                resolve(true)
            })
        })
    }
    render(){
        return(
            <Container>
                <Tabs value={this.state.tabIndex} onChange={this.changeTab}>
                    <Tab label="全部"></Tab>
                    <Tab label="分享"></Tab>
                    <Tab label="工作"></Tab>
                    <Tab label="问答"></Tab>
                    <Tab label="精品"></Tab>
                    <Tab label="测试"></Tab>
                </Tabs>
                <TopicListItem onClick={this.listItemClick} topic={} />
            </Container>
        )
    }
}
