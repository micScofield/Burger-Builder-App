import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const moreIngredient = (ingName) => {
    return {
        type: actionTypes.MORE_INGREDIENT,
        ingredientType: ingName
    }
}

export const lessIngredient = (ingName) => {
    return {
        type: actionTypes.LESS_INGREDIENT,
        ingredientType: ingName
    }
}

const setIngredients = (ingredients) => {
    //console.log(ingredients)
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients
    }
}

const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const fetchIngredients = () => {
    console.log('Making request !')
    return dispatch => {
        axios.get('https://react-my-burger-61bad.firebaseio.com/ingredients.json')
            .then(response => {
                // dispatch({type: actionTypes.FETCH_INGREDIENTS, ingredients: response.data})
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed(error))
            })
    }
}