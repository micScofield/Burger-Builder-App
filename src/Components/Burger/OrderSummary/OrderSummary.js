import React from 'react';
import classes from './OrderSummary.css';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../Button/Button';

const OrderSummary = props => {

    let transformedIngredients = Object.keys(props.ingredients).map((key) => {
        return <li key={key}> {key} : {props.ingredients[key]} </li>
    })
    //console.log(transformedIngredients)
    return (
        <Aux>
            <div className={classes.OrderSummary}>
                Ingredients Summary:
                <ul>
                    {transformedIngredients}
                </ul>
                <p><strong>Price: {props.price}</strong></p>
                <Button buttonType='Danger' clicked={props.goBackClicked}>Go Back</Button>
                <Button buttonType='Success' clicked={props.previewClicked}>Preview</Button>
                <Button buttonType='CrossIcon' clicked={props.crossIconClicked}>X</Button>
            </div>
        </Aux>
    )
}

export default OrderSummary;