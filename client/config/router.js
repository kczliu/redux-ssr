import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
export default ()=>[
    <Route key='2' path='/list' component ={TopicList} exact></Route>,
    <Route key='3' path='/detail' component ={TopicDetail} ></Route>,
]