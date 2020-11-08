import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = (props) => {

    const cssClasses=[classes.NavigationItems]
    if(props.sideDrawerShow) {
        cssClasses.push(classes.NavigationItemsForSidedrawer)
    }

    return (
        <ul className={cssClasses.join(' ')}>
            <NavigationItem link='/' exact clicked={props.clicked} sideDrawerShow={props.sideDrawerShow}>Home</NavigationItem>

            {props.isAuth ? <NavigationItem link='/orders' clicked={props.clicked} sideDrawerShow={props.sideDrawerShow} >Orders</NavigationItem> : null}
            {props.isAuth ? <NavigationItem link='/preview' clicked={props.clicked} sideDrawerShow={props.sideDrawerShow} >Current order</NavigationItem> : null}

            {props.isAuth
                ? <NavigationItem link='/logout' clicked={props.clicked} sideDrawerShow={props.sideDrawerShow} >Logout</NavigationItem>
                : <NavigationItem link='/auth' clicked={props.clicked} sideDrawerShow={props.sideDrawerShow} >Authenticate</NavigationItem>}
        </ul>
    )
}

export default NavigationItems;
