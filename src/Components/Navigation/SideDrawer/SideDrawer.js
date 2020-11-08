import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import Aux from '../../../hoc/Auxilliary'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {

    let attachedCssClasses = [classes.SideDrawer, classes.SidedrawerClosed]
    if (props.show) {
        attachedCssClasses = [classes.SideDrawer, classes.SidedrawerOpen]
    }
    //console.log(attachedCssClasses)

    return (
        <Aux>
            <Backdrop show={props.show} backdropClicked={props.backdropClicked} />
            {
                props.show ? <div className={attachedCssClasses.join(' ')}>
                    <div
                        className={classes.GoBack}
                        onClick={props.backdropClicked} ><strong>Go Back &larr;</strong>
                    </div>

                    <div className={classes.Logo}> <Logo /> </div>

                    <nav> <NavigationItems sideDrawerShow={props.show} isAuth={props.isAuth} clicked={props.backdropClicked}/> </nav>
                </div>
                    : null
            }
        </Aux>
    )
}

export default SideDrawer;