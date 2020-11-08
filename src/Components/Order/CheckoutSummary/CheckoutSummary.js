import React from 'react';
import classes from './CheckoutSummary.css'
import Burger from '../../Burger/Burger'
//import axios from '../../../axios'
import Button from '../../Button/Button'

const CheckoutSummary = props => {

    let burger = (
        <div>
            <p><strong>Please build a burger first !!!</strong></p>
        </div>
    )
    if (props.ingredients) {
        burger = <Burger ingredients={props.ingredients} />
    }

    return (
        <div className={classes.CheckoutSummary}>
            <div>
                <h3 style={{ color: 'orangeRed' }}>Here's the preview of your burger:</h3>
                {burger}
            </div>
            <Button buttonType='Danger' clicked={props.goBackClicked}>Go Back</Button>
            <Button buttonType='Success' clicked={props.continueClicked}>Continue</Button><br />
            <Button buttonType='Default' clicked={props.buildANewOneClicked}>Build a new one !</Button>
        </div>
    )
}

export default CheckoutSummary