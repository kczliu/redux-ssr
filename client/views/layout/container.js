import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core'

import Paper from '@material-ui/core/Paper'

const styles={
    root:{
        margin:24,
        marginTop:80,
    }
}
const Container =({children,classes})=>(
    <Paper className={classes.root} elevation={4}>
        {children}
    </Paper>
)
Container.propTypes={
    classes:PropTypes.object.isRequired,
    children:PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
}
export default withStyles(styles)(Container)