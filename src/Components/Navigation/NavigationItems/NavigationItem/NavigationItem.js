import React from 'react'
import classes from './NavigationItem.css'
import { NavLink } from 'react-router-dom'

const NavigationItem = (props) => {
    const cssClasses = [classes.NavigationItem]
    if(props.sideDrawerShow) {
        cssClasses.push(classes.NavigationItemForSidedrawer)
    }
    return (
        <li className = {cssClasses.join(' ')}>

            <NavLink to = {props.link}  exact = {props.exact} activeClassName = {classes.Active} onClick={props.clicked}>
                {props.children}
            </NavLink>

        </li>
    )
}

export default NavigationItem;