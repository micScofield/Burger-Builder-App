import React from 'react'
import classes from './Input.css'

const Input = props => {

    let cssClass = [classes.Input]
    if (props.invalid && props.touched) {
        cssClass.push(classes.Invalid)
    }
    //console.log(cssClass)

    let inputElement = null;
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={cssClass.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />
            break;

        case 'select':
            inputElement = (
                <select
                    value={props.value}
                    onChange={props.changed}
                    className={cssClass.join(' ')} >
                    {props.elementConfig.options.map(option => {
                        return (
                            <option key={option.value} value={option.value} >{option.displayValue}</option>
                        )
                    })}
                </select>
            )
            break;

        case 'textarea':
            inputElement = <textarea className={cssClass.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value} />
            break;
        default:
            //alert("can't identify the type !!!")
            break;
    }
    // switch (props.elementType) {
    //     case 'text':
    //         inputElement = <input className = {cssClass.join(' ')} type = {props.elementType} {...props.elementConfig} onChange = {props.changed} value={props.value} />
    //         break;
    //     case 'tel':
    //         inputElement = <input className = {cssClass.join(' ')} type = {props.elementType} {...props.elementConfig} onChange = {props.changed} value={props.value} />
    //         break;
    //     case 'select':
    //         inputElement = (
    //             <select 
    //                 value={props.value}
    //                 onChange = {props.changed}
    //                 className = {cssClass.join(' ')} >
    //                 {props.elementConfig.options.map(option => {
    //                     return (
    //                         <option key = {option.value} value = {option.value} >{option.displayValue}</option>
    //                     )
    //                 })}      
    //             </select>
    //         )
    //         break;
    //     case 'textarea':
    //         inputElement = <textarea className = {cssClass.join(' ')} type = {props.elementType} {...props.elementConfig} onChange = {props.changed} value={props.value} />
    //         break;
    //     default:
    //         //alert("can't identify the type !!!")
    //         break;
    // }

    return (
        <div>
            {inputElement}
        </div>
    )
}

export default Input