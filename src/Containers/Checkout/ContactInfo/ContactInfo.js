import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { checkValidity } from '../../../sharedFunctions/CheckValidity'
import { updateState } from '../../../store/utility'
import * as placeOrderActions from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/WithErrorHandler'
import classes from './ContactInfo.css'
import Button from '../../../Components/Button/Button'
import axios from '../../../axios'
import Loader from '../../../Components/UI/Loader/Loader'
import Modal from '../../../Components/UI/Modal/Modal'
import Input from '../../../Components/UI/Input/Input'

const ContactInfo = props => {

    const [loading, setLoading] = useState(false)
    const [showModalForInvalid, setShowModalForInvalid] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [formData, setFormData] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        Mobile: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter mobile no.'
            },
            value: '',
            validation: {
                required: true,
                fixLength: 10,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'textarea',
            elementConfig: {
                placeholder: 'Enter street name'
            },
            value: '',
            validation: {
                required: true,
                minLength: '3'
            },
            valid: false,
            touched: false
        },
        PINcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter PIN code'
            },
            value: '',
            validation: {
                required: true,
                fixLength: 6,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {

                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',   // value staying empty if we keep value: '' and dont touch this dropdown in form. Better to initialise.
            validation: {},
            valid: true,
            touched: false
        }
    })
    // checkValidity = (value, rules) => {
    //     let isValid = true

    //     if(!rules) {return true}

    //     if(rules.required) {
    //         isValid = value.trim() !== '' && isValid
    //     }

    //     if(rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if(rules.fixLength) {
    //         isValid = value.length === rules.fixLength && isValid
    //     }

    //     if(rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     //console.log(value)
    //     console.log(rules)
    //     console.log(isValid)

    //     return isValid
    // }

    const inputChangedHandler = (event, inputIdentifier) => {

        // const updatedFormData = { ...formData }
        // //console.log(updatedFormData)
        // const updatedFormDataDeep = { ...updatedFormData[inputIdentifier] }
        // //console.log(updatedFormDataDeep)

        // updatedFormDataDeep.value = event.target.value
        // updatedFormDataDeep.touched = true
        // //updatedFormDataDeep.valid = checkValidity(updatedFormDataDeep.value, updatedFormDataDeep.validation)
        // updatedFormDataDeep.valid = checkValidity(updatedFormDataDeep.value, updatedFormDataDeep.validation)

        // updatedFormData[inputIdentifier] = updatedFormDataDeep
        // //console.log(updatedFormData)


        const updatedFormDataDeep = updateState(formData[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, formData[inputIdentifier].validation)
        })
        const updatedFormData = updateState(formData, {
            [inputIdentifier]: updatedFormDataDeep
        })


        let isFormValid = true
        for (let key in updatedFormData) {
            isFormValid = updatedFormData[key].valid && isFormValid
        }
        console.log(isFormValid)

        setIsFormValid(isFormValid)
        setFormData(updatedFormData)

        //console.log(updatedFormDataDeep.valid)
    }

    const orderClickedHandler = (event, formDataArray) => {
        event.preventDefault();     //if we dont do this, on clicking it was refreshing the form by default.
        // console.log(props)

        // console.log('checking form validation...')
        // console.log(isFormValid)
        // console.log(formDataArray)

        let isFormValid = true
        for (let id in formDataArray) {
            isFormValid = formDataArray[id].config.valid && isFormValid
        }
        console.log(isFormValid)

        if (isFormValid === false) {
            console.log('Inside form validity check')
            setShowModalForInvalid(true)
        } else {
            setLoading(true)

            let userFormData = {}
            for (let userInputIdentifier in formData) {
                userFormData[userInputIdentifier] = formData[userInputIdentifier].value
            }
            console.log(userFormData)

            const orderDetails = {
                ingredients: props.ingredients,
                price: props.price,
                orderData: userFormData,
                userId: props.userId // for storing id of the user so we can fetch user specific orders.
            }

            props.PLACE_ORDER(orderDetails, props.token)
            // console.log(props.showModalForSuccess)
            // setState({showModalForSuccess: props.showModalForSuccess})
            // console.log(showModalForSuccess)


            // axios.post('/orders.json', orderDetails)
            //     .then(response => {
            //         setState({ loading: false, showModalForSuccess: true })
            //         console.log(response)
            //     })
            //     .catch(error => {
            //         setState({ loading: false })
            //         console.log(error)
            //     })
        }
    }

    const goBackHandler = () => {
        props.history.push('/preview')
    }

    const formInvalidModalBackdropHandler = () => {
        setShowModalForInvalid(false)
        props.history.push('/contactInfo')
        //props.history.goBack()
    }

    const orderSuccessBackdropClickedHandler = () => {
        console.log('Backdrop clicked')
        //setState({ showModalForSuccess: false })

        //props.showModalForSuccess = !props.showModalForSuccess   throws error, its a readonly prop
        props.MODAL_HIDE()
        props.history.push('/')
    }

    let formDataArray = []

    for (let key in formData) {
        formDataArray.push({
            id: key,
            config: formData[key]
        })
    }
    //console.log(formDataArray)

    let form = (
        <form onSubmit={(event) => orderClickedHandler(event, formDataArray)}>
            <h2 style={{ color: 'orangeRed' }} >Enter details</h2>

            {formDataArray.map(formElement => {
                //console.log(formElement)
                return (
                    <Input
                        key={formElement.id}
                        invalid={!formElement.config.valid}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)} />
                )
            })}
            <Button buttonType='Success' disabled={!isFormValid} >Order</Button>
        </form>
    )

    if (props.loading) {
        form = <Loader />
    }

    console.log('checking overall validity...')
    console.log(isFormValid)

    return (
        <div className={classes.ContactInfo}>
            {form}
            <Button buttonType='Danger' clicked={goBackHandler} >Go Back</Button>
            <Modal show={showModalForInvalid} backdropClicked={formInvalidModalBackdropHandler}>
                Please enter valid data !!!
                </Modal>

            <Modal show={props.showModalForSuccess} backdropClicked={orderSuccessBackdropClickedHandler} >
                Hurrah !!! <br /> Order Placed !
                </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.bbReducer.ingredients,
        price: state.bbReducer.price,
        showModalForSuccess: state.poReducer.showModalForSuccess,
        loading: state.poReducer.loading,
        token: state.authReducer.idToken,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        PLACE_ORDER: (orderDetails, token) => dispatch(placeOrderActions.placeOrder(orderDetails, token)),
        MODAL_HIDE: () => { dispatch(placeOrderActions.modalHide()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactInfo, axios))