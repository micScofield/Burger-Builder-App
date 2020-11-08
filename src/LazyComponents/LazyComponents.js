import React, { Suspense, lazy } from 'react'
import Loader from '../Components/UI/Loader/Loader'

const Checkout = lazy(() => import('../Containers/Checkout/Checkout'))
const ContactInfo = lazy(() => import('../Containers/Checkout/ContactInfo/ContactInfo'))
const Auth = lazy(() => import('../Containers/Auth/Auth'))

export const lazyCheckout = (props) => {
    return(
        <Suspense fallback={<Loader />}>
            <Checkout {...props} />
        </Suspense>
    )
}

export const lazyContactInfo = (props) => {
    return(
        <Suspense fallback={<Loader />}>
            <ContactInfo {...props} />
        </Suspense>
    )
}

export const auth = (props) => {
    console.log('[Lazy auth]', props)
    return(
        <Suspense fallback={<Loader />}>
            <Auth {...props} />
        </Suspense>
    )
}