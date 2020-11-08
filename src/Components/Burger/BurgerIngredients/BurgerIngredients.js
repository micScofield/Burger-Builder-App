import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIngredients.css';

const BurgerIngredients = props =>{

        let ingredient = null;

        switch (props.type) {
            case ('Bread-Top'):
                ingredient = <div className={classes.BreadTop} ></div>;
                break;
            case ('Bread-Bottom'):
                ingredient = <div className={classes.BreadBottom} ></div>;
                break;
            case ('Seeds1'):
                ingredient = <div className={classes.Seeds1} ></div>;
                break;
            case ('Seeds2'):
                ingredient = <div className={classes.Seeds2} ></div>;
                break;
            case ('Cutlet'):
                ingredient = <div className={classes.Cutlet} ></div>;
                break;
            case ('Cheese'):
                ingredient = <div className={classes.Cheese} ></div>;
                break;
            case ('Salad'):
                ingredient = <div className={classes.Salad} ></div>;
                break;
            case ('Bacon'):
                ingredient = <div className={classes.Bacon} ></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
}

BurgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredients;

