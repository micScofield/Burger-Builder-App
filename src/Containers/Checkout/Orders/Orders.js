import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as fetchOrdersActions from '../../../store/actions/index'
import classes from './Orders.css'
import Order from '../../../Components/Order/Order'
import axios from '../../../axios'
import Loader from '../../../Components/UI/Loader/Loader'
import withErrorHandler from '../../../hoc/WithErrorHandler'

const Orders = props => {

    useEffect(() => {
        props.FETCH_ORDERS(props.token, props.userId)
    }, [])

    // componentDidMount() {
    //     props.FETCH_ORDERS(props.token, props.userId)
    //     // axios.get('/orders.json')
    //     //     .then(res => {
    //     //         //console.log(res.data)
    //     //         const fetchedData = []
    //     //         for(let i in res.data) {
    //     //             console.log(res.data)
    //     //             fetchedData.push({
    //     //                 ...res.data[i],
    //     //                 id: i
    //     //             })
    //     //         }
    //     //         console.log(fetchedData)
    //     //         this.setState({loading: false, orderData: fetchedData})
    //     //     })
    //     //     .catch(error => {
    //     //         this.setState({error: true})
    //     //         console.log(error)
    //     //     })
    // }

    // console.log(props.orderData)
    // console.log(props.ingredients)

    let showOrder = null

    if (props.orderData) {
        showOrder = (
            props.orderData.map(order => <Order key={order.id} price={+order.price} ingredients={order.ingredients} />)
        )
    }

    if (props.loading) {
        showOrder = <Loader />
    }

    return (
        <div className={classes.Orders}>
            <h3>Your orders</h3>
            {showOrder}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orderData: state.foReducer.orderData,
        error: state.foReducer.error,
        loading: state.foReducer.loading,
        ingredients: state.bbReducer.ingredients,
        price: state.bbReducer.price,
        token: state.authReducer.idToken,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FETCH_ORDERS: (token, userId) => dispatch(fetchOrdersActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
