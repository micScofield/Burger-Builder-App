import React, { useState } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auxilliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.css'
//import actionTypes from '../../store/actions/actionTypes'

const Layout = props => {

    const [sideDrawerShow, setSideDrawerShow] = useState(false)

    const menuClickedHandler = () => {
        setSideDrawerShow(!sideDrawerShow)
    }

    const backdropClickedHandler = () => {
        setSideDrawerShow(!sideDrawerShow)
    }

    return (
        <Aux>
            <Toolbar menuClicked={menuClickedHandler} isAuth={props.isAuth} />
            <SideDrawer show={sideDrawerShow} backdropClicked={backdropClickedHandler} isAuth={props.isAuth} />
            <div className={classes.Content}>{props.children}</div>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.idToken
    }
}

export default connect(mapStateToProps)(Layout);