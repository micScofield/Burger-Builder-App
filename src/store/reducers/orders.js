import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orderData: null,
    error: false,
    loading: true
}

const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.STORE_ORDERS) {
        return {
            ...state,
            orderData: action.orderData,
            error: false,
            loading: false
        }
    }
    if(action.type === actionTypes.FETCH_ORDERS_FAILED) {
        return {
            ...state,
            error: true,
            loading: false
        }
    }
    return state;
}

export default reducer