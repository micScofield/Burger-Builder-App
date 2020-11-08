import React, { useEffect, useState, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux'
import Aux from '../../hoc/Auxilliary';
//import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerBuilderActions from '../../store/actions/index'
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios'
import Loader from '../../Components/UI/Loader/Loader'
import WithErrorHandler from '../../hoc/WithErrorHandler'

export const BurgerBuilder = props => {

    const [orderNowBool, setOrderNowBool] = useState(false)

    //retreiving states...
    const ingredients = useSelector(state => state.bbReducer.ingredients)
    const price = useSelector(state => state.bbReducer.price)
    const error = useSelector(state => state.bbReducer.error)
    const loading = useSelector(state => state.bbReducer.loading)
    const isAuth = useSelector(state => state.authReducer.idToken)
    //const building = useSelector(state => state.bbReducer.building)
    const purchasablePrice = useSelector(state => state.bbReducer.price)

    //dispatching actions...
    const dispatch = useDispatch()

    const MORE_INGREDIENT = (ingType) => dispatch(burgerBuilderActions.moreIngredient(ingType))
    const LESS_INGREDIENT = (ingType) => dispatch(burgerBuilderActions.lessIngredient(ingType))
    const FETCH_INGREDIENTS = useCallback(() => dispatch(burgerBuilderActions.fetchIngredients()), [dispatch])
    //const onSetRedirectPath = (path) => dispatch(burgerBuilderActions.setRedirectAuthPath(path))

    useEffect(() => {
        FETCH_INGREDIENTS()
    }, [FETCH_INGREDIENTS])


    // componentDidMount() {

    //     // props.FETCH_INGREDIENTS()
    //     // axios.get('https://react-my-burger-61bad.firebaseio.com/ingredients.json')
    //     //     .then(request => {
    //     //         console.log(request)
    //     //         setState({ingredients: request.data})
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //         setState({error: true})
    //     //     })
    // }

    const OrderNowHandler = (props) => {

        setOrderNowBool(true)

        // MAx approach
        // if(props.isAuth) {
        //     setState({
        //         orderNowBool: true
        //     })
        // } else {
        //     props.onSetRedirectPath('/preview')
        //     props.history.push('/auth')
        // }
    }

    const previewClickedHandler = () => {

        // const queryparams = []
        // for(let i in props.ingredients) {
        //     queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(props.ingredients[i]))
        // }
        // queryparams.push('price=' + props.price)
        // const queryString = queryparams.join('&')
        // console.log(queryString)
        // props.history.push({
        //     pathname: '/preview',
        //     search : '?' + queryString
        // })

        //props.history.push('/preview')  // approach before checkiing authentication..

        //My approach..(had a flaw.see docs 255-258)

        // if(props.building && props.isAuth) {
        //     props.history.push('/preview')
        // } else {
        //     props.history.push('/auth')
        // }

        if (purchasablePrice > 20 && isAuth) {
            props.history.push('/preview')
        } else {
            props.history.push('/auth')
        }

        //Max approach
        //props.history.push('/preview')
    }

    const updatePurchasable = (price) => price > 20

    const backdropHandler = () => {
        setOrderNowBool(false)
    }

    const disabledInfo = {
        ...ingredients
    }

    for (let i in disabledInfo) {
        disabledInfo[i] = disabledInfo[i] <= 0
    }

    //let contextProvider = null;
    let orderSummary = null;
    let burger = error ? <p>Ingredients cant be loaded </p> : <Loader />;
    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />

                <BuildControls
                    added={MORE_INGREDIENT}
                    reduced={LESS_INGREDIENT}
                    price={price}
                    purchasable={updatePurchasable(price)}
                    disabled={disabledInfo}
                    isAuth={isAuth}
                    clicked={OrderNowHandler} />
            </Aux>
        )

        orderSummary = <OrderSummary
            ingredients={ingredients}
            price={price}
            goBackClicked={backdropHandler}
            previewClicked={previewClickedHandler}
            crossIconClicked={backdropHandler}
        />;
        // console.log('Right above context !')
        // console.log(state.ingredients)
        //contextProvider = <IngredientContext.Provider value = {state.ingredients}></IngredientContext.Provider>
    }
    if (loading) {
        orderSummary = <Loader />
    }
    return (
        <Aux>
            {/* <h2>It is {state.date.toLocaleTimeString()}.</h2> */}
            <Modal show={orderNowBool} backdropClicked={backdropHandler} >
                {orderSummary}
            </Modal>

            {burger}
        </Aux>
    )
}

// const mapStateToProps = state => {
//     return {
//         ingredients: state.bbReducer.ingredients,
//         price: state.bbReducer.price,
//         error: state.bbReducer.error,
//         loading: state.bbReducer.loading,
//         isAuth: state.authReducer.idToken,
//         //building: state.bbReducer.building,
//         purchasablePrice: state.bbReducer.price
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         MORE_INGREDIENT: (ingType) => dispatch(burgerBuilderActions.moreIngredient(ingType)),
//         LESS_INGREDIENT: (ingType) => dispatch(burgerBuilderActions.lessIngredient(ingType)),
//         FETCH_INGREDIENTS: () => dispatch(burgerBuilderActions.fetchIngredients()),
//         //onSetRedirectPath : (path) => dispatch(burgerBuilderActions.setRedirectAuthPath(path))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));

export default WithErrorHandler(BurgerBuilder, axios)