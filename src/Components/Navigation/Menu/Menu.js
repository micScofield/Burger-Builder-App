import React from 'react';
//import Button from '../../Button/Button';
import classes from './Menu.css'

const Menu = (props) => {
    return (
        //<Button  clicked = {props.menuClicked}  buttonType = 'Menu' >Menu</Button>        

        <div className = {classes.Menu}  onClick = {props.clicked} >
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Menu;