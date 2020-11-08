import React, { Component } from 'react';
import classes from './Checkout.css'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
//import { Route } from 'react-router-dom'
//import ContactInfo from './ContactInfo/ContactInfo'
import { connect } from 'react-redux'

const Checkout = props => {

    // state = {
    //     ingredients: null,
    //     price: null
    // }

    //componentDidMount() {
    // const query = new URLSearchParams(props.location.search)
    // const ingredients = {}
    // let price = null
    // //console.log(props.location.search)
    // for (let param of query.entries()) {
    //     if (param[0] === 'price') {
    //         price = param[1]
    //     } else {
    //         ingredients[param[0]] = +param[1]
    //     }
    // }
    // setState({ ingredients: ingredients, price: price })
    //}

    const goBackClickedHandler = () => {
        props.history.goBack()
    }

    const continueClickedHandler = () => {
        //props.history.push(props.location.pathname + '/contactInfo')
        props.history.push('/contactInfo')
    }

    const buildANewOneClickedHandler = () => {
        props.history.push('/')
    }


    //console.log(props)
    return (
        <div className={classes.Checkout}>
            <CheckoutSummary
                // ingredients = {state.ingredients}  
                ingredients={props.ingredients}
                goBackClicked={goBackClickedHandler}
                continueClicked={continueClickedHandler}
                buildANewOneClicked={buildANewOneClickedHandler} />
            {/* <Route
                    path={props.match.url + '/contactInfo'}
                    render={(props) => (
                        <ContactInfo
                            ingredients={props.ingredients}
                            price={props.price}
                            {...props} />
                    )}
                /> */}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.bbReducer.ingredients,
        price: state.bbReducer.price
    }
}

export default connect(mapStateToProps)(Checkout)