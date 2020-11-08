import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    console.log(props)

    let transformedIngredients = Object.keys(props.ingredients).map((ingredientType) => {
        return [...Array(props.ingredients[ingredientType])].map((_, index) => {
            return <BurgerIngredients  key = {ingredientType + index} type = {ingredientType} />
        });
    }).reduce((total, currentValue) => {
        return total.concat(currentValue);
    },[]);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>
    }

    return(

        <div className = {classes.Burger}>
            <BurgerIngredients type = "Bread-Top" />
            {transformedIngredients}
            <BurgerIngredients type = "Bread-Bottom" />
        </div>

    )
}

export default burger;