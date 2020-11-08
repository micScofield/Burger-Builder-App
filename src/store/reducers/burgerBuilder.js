import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const ING_PRICES = {
    Salad: 5,
    Cheese: 10,
    Cutlet: 20,
    Bacon: 15
}

const initialState = {
    // ingredients: {
    //     Salad: 0,
    //     Cheese: 0,
    //     Cutlet: 0,
    //     Bacon: 0
    // },
    ingredients: null,
    price: 20,
    error: false,
    loading: true,
    building: false
}

const fetchIngredients = (state, action) => {
    return updateState(state, {
        ingredients: {
            Salad: action.ingredients.Salad,
            Bacon: action.ingredients.Bacon,
            Cutlet: action.ingredients.Cutlet,
            Cheese: action.ingredients.Cheese
        },
        error: false,
        loading: false,
        price: 20,
        building: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    updateState(state, {
        ingredients: action.ingredients,
        error: true,
        loading: false,
        building: false
    })
}

const lessIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientType]: state.ingredients[action.ingredientType] - 1 }
    const updatedIngredients = updateState(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price - ING_PRICES[action.ingredientType],
        building: true
    }
    //const updatedState = updateState(state, {updatedIngredients, price: state.price - ING_PRICES[action.ingredientType] }) bad approach as it doesnt set our ingredients and price property inside store
    return updateState(state, updatedState)
}

const moreIngredient = (state, action) => {
    const updatedIngredientsMore = updateState(state.ingredients, { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 })
    const updatedStateMore = {
        ingredients: updatedIngredientsMore,
        price: state.price + ING_PRICES[action.ingredientType],
        building: true
    }
    return updateState(state, updatedStateMore)
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_INGREDIENTS: return fetchIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        case actionTypes.LESS_INGREDIENT: return lessIngredient(state, action)
        case actionTypes.MORE_INGREDIENT: return moreIngredient(state, action)
        default: return state
    }

    // if(action.type === actionTypes.FETCH_INGREDIENTS) {
    //     return {
    //         ...state,
    //         //ingredients: action.ingredients,
    //         ingredients: {
    //             Salad: action.ingredients.Salad,
    //             Bacon: action.ingredients.Bacon,
    //             Cutlet: action.ingredients.Cutlet,
    //             Cheese: action.ingredients.Cheese
    //         },
    //         error: false,
    //         loading: false,
    //         price: 20
    //     }
    // }

    // if(action.type === actionTypes.FETCH_INGREDIENTS_FAILED) {
    //     return {
    //         ...state,
    //         ingredients: action.ingredients,
    //         error: true,
    //         loading: false
    //     }
    // }

    // if (action.type === actionTypes.MORE_INGREDIENT) {

    //     return {
    //         ...state,
    //         ingredients: {
    //             ...state.ingredients,
    //             [action.ingredientType]: state.ingredients[action.ingredientType] + 1
    //         },
    //         price: state.price + ING_PRICES[action.ingredientType],
    //     }
    // }

    // if (action.type === actionTypes.LESS_INGREDIENT) {

    //     return {
    //         ...state,
    //         ingredients: {
    //             ...state.ingredients,
    //             [action.ingredientType]: state.ingredients[action.ingredientType] - 1
    //         },
    //         price: state.price - ING_PRICES[action.ingredientType]
    //     }
    // }
    // return state
}

export default reducer
