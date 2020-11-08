import React from 'react'
import classes from './Order.css'

const Order = props => {
    const ingredientsObject = props.ingredients
    //console.log(ingredientsObject)

    const ingredientsArray = []

    for (let i in ingredientsObject) {
        ingredientsArray.push({
            name: i,
            quantity: ingredientsObject[i]
        })
    }

    //console.log(ingredientsArray)
    const outputIngredient = ingredientsArray.map(ig => {
        return <span style={{
            backgroundColor: '#8F5E1E',
            color: 'white',
            display: 'inline-block',
            margin: '0px 8px',
            padding: '3px',
            border: '1px solid #ccc',
            boxSizing: 'border-boxs'
        }}
            key={ig.name}>
            {ig.name} ({ig.quantity})
            </span>
    })

    const outputPrice = <span style={{ color: '8F5E1E' }}>{props.price}</span>

    return (
        <div className={classes.Order}>
            <p style={{ color: 'darkorange' }}>Ingredients: {outputIngredient}</p>
            <p style={{ color: 'darkorange' }}>Price: <strong>{outputPrice}</strong></p>
        </div>
    )
}

export default Order;