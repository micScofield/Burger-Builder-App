import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import Menu from '../Menu/Menu'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => {
    return (
        <header className = {classes.Toolbar}>
            <Menu clicked = {props.menuClicked} />

            <div className = {classes.Logo}>
                <Logo />
            </div>
            
            <nav className = {classes.DesktopOnly}>
                <NavigationItems isAuth = {props.isAuth} />
            </nav>
        </header>
    )
}

 export default Toolbar;