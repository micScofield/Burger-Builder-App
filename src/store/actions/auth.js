import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        //expirationDate: expirationDate,
        userId: userId
    }
}

export const authSuccessOnRefresh = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS_ON_REFRESH,
        idToken: token,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}


export const authLogout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('exprationDate')
    // localStorage.removeItem('userId')
    localStorage.clear() // clears all.

    return {
        //type: actionTypes.AUTH_LOGOUT
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}
export const DidLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout = (expirationTime) => {
    // console.log('checkAuthTimeout', expirationTime)
    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(authLogout())
    //     }, expirationTime * 1000)
    // }

    return {
        type: actionTypes.CHECK_AUTH_TIMEOUT,
        expirationTime: expirationTime
    }
}


// Approach with redux-saga:
export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    }
}

//Below is the approach without redux saga
// export const auth = (email, password, isSignUp) => {
    // let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLqBWYQeBqqCdmYvrPfLfE1BiDHabhIYI'
    // if (!isSignUp) {
    //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLqBWYQeBqqCdmYvrPfLfE1BiDHabhIYI'
    // }

    // return dispatch => {
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     }
    //     dispatch(authStart())

    //     axios.post(url, authData)
    //         .then(response => {
    //             console.log('then block', response)
    //             localStorage.setItem('token', response.data.idToken)
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    //             localStorage.setItem('expirationDate', expirationDate)
    //             localStorage.setItem('userId', response.data.localId)
    //             dispatch(authSuccess(response.data.idToken, response.data.localId))
    //             dispatch(checkAuthTimeout(response.data.expiresIn))
    //         })
    //         .catch(error => {
    //             //console.log('catch block', error)
    //             console.log('Maximillian log', error.response.data.error.message)
    //             dispatch(authFailed(error.response.data.error.message))
    //         })
    // }
//}

// export const setRedirectAuthPath = (path) => {
//     return {
//         type: actionTypes.SET_REDIRECT_AUTH_PATH,
//         path: path
//     }
// }
//export this method in index.js also to continue using it.


//Checking authentiaction status on refresh with Saga
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE_FOR_SAGA
    }
}


//Checking authentiaction status on refresh without Saga
// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token')
//         const expirationDate = localStorage.getItem('expirationDate')
//         const userId = localStorage.getItem('userId')
//         console.log(token, expirationDate, userId)
//         if (token) {
//             if (new Date(expirationDate) > new Date()) {
//                 console.log('authCheckState: true', expirationDate)
//                 //dispatch(authSuccess(token, localId))
//                 dispatch(authSuccessOnRefresh(token, userId))
//                 dispatch(checkAuthTimeout((new Date(expirationDate).getTime() - new Date().getTime())/1000))
//             }
//         } else {
//             console.log('authCheckState: false', expirationDate)
//             dispatch(authLogout())
//         }
//     }
// }
