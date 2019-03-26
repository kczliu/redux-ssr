import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {topicPrimaryStyle,topicSecondaryStyle} from './styles'

const Primary=({classes,topic})=>{
    return (
        <div className={classes.root}>
            <span className={classes.tab}>{topic.tab}</span>
            <span className={classes.title}>{topic.title}</span>
        </div>
    )
}
const StylePrimary = withStyles(topicPrimaryStyle)(Primary)

const Secondary=({classes,topic})=>{
    return (
        <div className={classes.root}>
            <span className={classes.username}>{topic.username}</span>
            <span className={classes.count}>
                <span className={classes.accentColor}>{topic.reply_count}</span>
                <span>/</span>
                <span>{topic.visit_count}</span>
            </span>
            <span>创建时间：{topic.time}</span>
        </div>
    )
}
const StyleSecondary = withStyles(topicSecondaryStyle)(Secondary)



export default ({onClick,topic})=>{
    return (
        <ListItem button onClick={onClick}>
            <ListItemAvatar>
                <Avatar src={topic.image}/>
            </ListItemAvatar>
            <ListItemText primary={<StylePrimary topic={topic}></StylePrimary>} secondary={<StyleSecondary topic={topic}></StyleSecondary>}></ListItemText>
        </ListItem>
    )
}