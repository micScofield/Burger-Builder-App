import React from 'react';
import BurgerLogo from '../../Assets/Images/BurgerLogo.png';
import classes from './Logo.css'
const logo = (props) => {
    return (
        <div className = {classes.Logo}>
            <img src = {BurgerLogo} alt = 'Logo' />
        </div>
    )
}
export default logo;