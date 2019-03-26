import React,{Component} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';


export default class TopicDetail extends Component {
    getTopics=()=>{
        axios.get('/api/topics')
            .then(res=>{
                console.log(res)
            })
    }
    login=()=>{
        axios.post('/api/user/login',{
            accessToken:'a15b150b-f00e-44b2-b0c0-0f52fc92ad57'
        })
            .then(res=>{
                console.log(res)
            })
    }
    markAll=()=>{
        axios.post('/api/message/mark_all?needAccessToken=true')
            .then(res=>{
                console.log(res)
            })
    }

    render(){
        return(
            <div>
                <button onClick ={this.getTopics}>topics</button>
                <button onClick ={this.login}>login</button>
                <button onClick ={this.markAll}>markAll</button>
                <Button variant="contained" color="primary">this is button</Button>
                <Button variant="contained" color="primary">刘菁会成功</Button>
            </div>
        )
    }
}

