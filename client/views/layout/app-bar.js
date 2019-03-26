import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'

import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Home from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';


const style = {
    root:{
        width:'100%'
    },
    flex:{
        flex:1
    },
    margin:{
        marginRight: 15
    }

}
 class MainAppBar extends Component {
    constructor(){
        super()
    }
    onHomeIconClick=()=>{

    }
    createButtonClick=()=>{

    }
    loginButtonClick=()=>{

    }
    render(){
        const {classes} = this.props
        return (
                <div className={classes.root}>
                    <AppBar position="fixed">
                        <ToolBar>
                            <IconButton  color="inherit" aria-label="Menu" onClick={this.onHomeIconClick}>
                                <Home></Home>
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>jnode</Typography>
                            <Button variant="contained" color="primary" className={classes.margin} onClick={this.createButtonClick}>新建话题</Button>
                            <Button variant="contained" color="primary" onClick={this.loginButtonClick}>登录</Button>
                        </ToolBar>
                    </AppBar>
                </div>
            )
    }
}

export default withStyles(style)(MainAppBar)