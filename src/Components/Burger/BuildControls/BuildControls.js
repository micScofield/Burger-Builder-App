import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const burgerIngredients = [
    { label: 'Saladlabel', type: 'Salad' },
    { label: 'Cheeselabel', type: 'Cheese' },
    { label: 'Cutletlabel', type: 'Cutlet' },
    { label: 'Baconlabel', type: 'Bacon' }
]

const buildControls = (props) => {

    return (

        <div className={classes.BuildControls}>
            Price: {props.price}
            {
                burgerIngredients.map(i => (
                    <BuildControl
                        key={i.label}
                        label={i.label}
                        disabled={props.disabled[i.type]}
                        reduced={() => { props.reduced(i.type) }}
                        added={() => { props.added(i.type) }} />
                ))
            }
            {/* <button 
            className = {classes.OrderButton}
            disabled = {!props.purchasable || !props.isAuth}
            onClick = {props.clicked}>Order Now</button> */}

            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.clicked}>
                    {props.isAuth ? 'Order Now': 'Login to order' }
            </button>

        </div>
    )
}

export default buildControls;