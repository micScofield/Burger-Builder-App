import React, { useState } from 'react'
import { connect } from 'react-redux'
import { checkValidity } from '../../sharedFunctions/CheckValidity'
import { updateState } from '../../store/utility'
//import { Redirect } from 'react-router-dom'
import * as authActions from '../../store/actions/index'
//import withErrorHandler from '../../hoc/WithErrorHandler'
import Modal from '../../Components/UI/Modal/Modal'
import classes from './Auth.css'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/Button/Button'
//import axios from 'axios'
import Loader from '../../Components/UI/Loader/Loader'
//import Transition from 'reacttransition-group/Transition'

const Auth = props => {

    const [isFormValid, setIsFormValid] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [loginForm, setLoginForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })

    // componentDidMount() {
    //     if(!props.building && props.redirectAuthPath !== '/') {
    //         props.onSetRedirectAuthPath()
    //     }
    // }

    // checkValidity = (value, rules) => {
    //     console.log(value, rules)
    //     let isValid = true

    //     if(!rules) {return true}

    //     if(rules.required) {
    //         isValid = value.trim() !== '' && isValid
    //     }

    //     if(rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     if(rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     return isValid
    // }

    const inputChangedHandler = (event, inputIdentifier) => {
        // console.log('Input changed', event.target.value)
        // console.log('input name', inputIdentifier)

        //Approach 1...
        // const updatedLoginForm = {...loginForm}
        // const updatedLoginFormDeep = {...updatedLoginForm[inputIdentifier]}
        // updatedLoginFormDeep.value = event.target.value
        // console.log(updatedLoginFormDeep)
        // updatedLoginForm[inputIdentifier] = updatedLoginFormDeep


        //Approach 2..
        // const updatedLoginForm = {
        //     ...loginForm,
        //     [inputIdentifier]: {
        //         ...loginForm[inputIdentifier],
        //         value: event.target.value,
        //         touched: true,
        //         //valid: checkValidity(event.target.value, loginForm[inputIdentifier].validation)
        //         valid: checkValidity(event.target.value, loginForm[inputIdentifier].validation)
        //     }
        // }


        //Approach 3..
        const updatedLoginForm = updateState(loginForm, {
            [inputIdentifier]: updateState(loginForm[inputIdentifier], {
                value: event.target.value,
                touched: true,
                //valid: checkValidity(event.target.value, loginForm[inputIdentifier].validation)
                valid: checkValidity(event.target.value, loginForm[inputIdentifier].validation)
            })
        })


        let isFormValid = true
        for (let key in updatedLoginForm) {
            isFormValid = updatedLoginForm[key].valid && isFormValid
        }
        console.log(isFormValid)

        setLoginForm(updatedLoginForm)
        setIsFormValid(isFormValid)
        
        //console.log(loginForm)  // doesnt update instantly. updates later(see log inside render)
    }


    const loginClickedHandler = (event) => {
        event.preventDefault()
        console.log('Login clicked !')
        props.onAuth(loginForm.email.value, loginForm.password.value, isSignUp)
    }

    const toggleSignupHandler = (event) => {
        event.preventDefault()
        console.log('Switched buttons !')
        setIsSignUp(!isSignUp)
    }

    const backdropClickedHandlerForFailure = () => {
        props.modalHide()
        props.history.push('/auth')
    }

    const backdropClickedHandlerForSuccess = () => {
        props.modalHide()
        //isLoggedIn(props.isLoggedIn)

        // if(props.building) {
        //     props.history.push('/preview')
        // } else {
        //     props.history.push('/')  
        // }

        if (props.purchasablePrice > 20) {
            props.history.push('/preview')
        } else {
            props.history.push('/')
        }

        // Also alternative would be set the to property of redirect dynamically, ie. fetching from store !
        //see inside render. Se docs instead for full process page 255-258

    }

    // isLoggedIn = (authStatus) => {
    //     if(authStatus === true) {
    //         props.history.push('/')
    //     } else {
    //         props.history.push('/auth')
    //     }
    // }

    //console.log(props)
    const loginFormArray = []
    for (let i in loginForm) {
        const formElement = {
            id: i,
            config: loginForm[i]
        }
        loginFormArray.push(formElement)
    }
    //console.log(loginFormArray)
    //console.log(loginForm)

    let form = (
        <form onSubmit={loginClickedHandler}>
            <h2 style={{ color: 'white', fontWeight: 'bold' }}>Please Log In !</h2>
            {
                loginFormArray.map(i => {
                    return (
                        <Input
                            key={i.id}
                            invalid={!i.config.valid}
                            touched={i.config.touched}
                            elementType={i.config.elementType}
                            elementConfig={i.config.elementConfig}
                            changed={(event) => inputChangedHandler(event, i.id)}
                            value={i.config.value} />
                    )
                })
            }
            <Button buttonType='Default' disabled={!isFormValid}>Submit</Button><br />
            <Button buttonType='Success' clicked={toggleSignupHandler}>Switch to {!isSignUp ? 'SignUp Mode' : 'SignIn Mode'}</Button>
            {/* <Button buttonType = 'Success'  disabled = {!isFormValid} onClick={loginClickedHandler} >New user ? Sign up</Button> */}
        </form>
    )
    //Max approach
    // let authRedirect = null
    // if(props.isAuth) {
    //     authRedirect = <Redirect to={props.redirectAuthPath} />
    // }

    return (
        <div className={classes.Auth}>
            {/* //Maximillian approach for redirection.. */}
            {/* {authRedirect} */}
            {/* {console.log(props.error)} */}


            {props.loading ? <Loader /> : form}


            {/* {props.showModalForSuccess ? <Modal show={props.showModalForSuccess} backdropClicked = {backdropClickedHandlerForSuccess}>Logged in !</Modal>: null}
                {props.showModalForFailure ? <Modal show={props.showModalForFailure} backdropClicked = {backdropClickedHandlerForFailure}>Authentication Failed ! Please retry <br /> {props.error} </Modal> : null} */}


            {/* used below method in order to apply Transition and animations: */}
            <Modal show={props.showModalForSuccess} backdropClicked={backdropClickedHandlerForSuccess}>Logged in !</Modal>
            <Modal show={props.showModalForFailure} backdropClicked={backdropClickedHandlerForFailure}>Authentication Failed ! Please retry <br /> {props.error} </Modal>
        </div>
    )

    // return (
    //     <div className = {classes.Auth}>
    //         {props.loading ? <Loader /> : form}
    //         <Transition 
    //             in = {props.showModalForSuccess}
    //             timeout = {700}
    //             mountOnEnter
    //             unmountOnExit>
    //                 {state => <Modal show={state} backdropClicked = {backdropClickedHandlerForSuccess}>Logged in !</Modal>}            
    //         </Transition>
    //         {props.showModalForFailure ? <Modal show backdropClicked = {backdropClickedHandlerForFailure}>Authentication Failed ! Please retry <br /> {props.error} </Modal> : null}
    //     </div>
    // )

}

const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        loading: state.authReducer.loading,
        showModalForSuccess: state.authReducer.showModalForSuccess,
        showModalForFailure: state.authReducer.showModalForFailure,
        //isLoggedIn: state.authReducer.loggedIn,
        //expiresIn: state.authReducer.expiresIn,
        //building: state.bbReducer.building,
        purchasablePrice: state.bbReducer.price,
        redirectAuthPath: state.authReducer.redirectAuthPath,
        isAuth: state.authReducer.idToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(authActions.auth(email, password, isSignUp)),
        modalHide: () => dispatch(authActions.modalHide()),
        //onSetRedirectAuthPath: () => dispatch(authActions.setRedirectAuthPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)