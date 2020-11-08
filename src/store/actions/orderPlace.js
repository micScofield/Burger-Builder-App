import * as actionTypes from './actionTypes'
import axios from '../../axios'

const setOrder = (orderDetails, id) => {
    const newOrder = {
        orderData: orderDetails,
        orderId: id
    }
    console.log('[New Order]', newOrder)
    return {
        type: actionTypes.STORE_ORDER,
        order: newOrder
    }
}

const orderPlaceFailed = (error) => {
    return {
        type: actionTypes.PLACE_ORDER_FAILED,
        error: error // or dont pass it all and set the error state to true in reducer. Its not required as such.
    }
}

const showLoader = () => {
    return {
        type: actionTypes.SHOW_LOADER
    }
}

export const placeOrder = (orderDetails, token) => {
    console.log('[OrderDetails]', orderDetails)
    return dispatch => {
        dispatch(showLoader())
        axios.post('/orders.json?auth=' + token, orderDetails)
            .then(response => {
                console.log('[AxiosPost response]', response)
                dispatch(setOrder(orderDetails, response.data.name))                
            })
            .catch(error => {
                dispatch(orderPlaceFailed(error))
            })
    }
}

export const modalHide = () => {
    return {
        type: actionTypes.MODAL_HIDE
    }
}
