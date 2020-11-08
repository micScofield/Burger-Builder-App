import * as actionTypes from './actionTypes'
import axios from '../../axios'
const setOrderData = (data) => {
    console.log('dispatching')
    return {
        type:  actionTypes.STORE_ORDERS,
        orderData: data
    }
}

const fetchOrderDataFailed = (error) => {
    console.log('dispatching error')
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    console.log('fetching')
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get('/orders.json' + queryParams)
            .then(response => {
                const fetchedData = []
                for(let i in response.data) {         
                    fetchedData.push({
                        ...response.data[i],
                        id: i
                    })
                }
                dispatch(setOrderData(fetchedData))
            })
            .catch(error => {
                dispatch(fetchOrderDataFailed(error))
            })
    }
}