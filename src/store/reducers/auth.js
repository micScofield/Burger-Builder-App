import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'
const initialState = {
    loggedIn: false,
    error: false,
    loading: false,
    userId: null,
    idToken: null,
    //expirationDate: null,
    showModalForSuccess: false,
    showModalForFailure: false,
    redirectAuthPath: null
}

const authStart = (state) => {
    return updateState(state, {loading: true} )
}
const authSuccess = (state, action) => {
    return updateState(state, {
        showModalForSuccess: true, 
        loading: false,
        loggedIn: true,
        idToken: action.idToken,
        //expirationDate: action.expirationDate,  //We dont use it here, instead action file.
        userId: action.userId
    })
}
const authSuccessOnRefresh = (state, action) => {
    return updateState(state, {
        loading: false,
        loggedIn: true,
        idToken: action.idToken,
        userId: action.userId
    })
}
const authFailed = (state, action) => {
    return updateState(state, {
        error: action.error, 
        loading: false, 
        showModalForFailure: true,
        loggedIn: false
    })
}
const authModalHide = (state) => {
    return updateState(state, {showModalForSuccess: false, showModalForFailure: false})
}
const authLogout = (state) => {
    return updateState(state, {userId: null, idToken: null})
}
// const setRedirectAuthPath = (state, action) => {
//     return updateState(state, {redirectAuthPath: action.path})
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_FAILED: return authFailed(state, action)
        case actionTypes.AUTH_START: return authStart(state)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.MODAL_HIDE: return authModalHide(state)
        case actionTypes.AUTH_LOGOUT: return authLogout(state)
        //case actionTypes.SET_REDIRECT_AUTH_PATH: return setRedirectAuthPath(state, action)
        case actionTypes.AUTH_SUCCESS_ON_REFRESH: return authSuccessOnRefresh(state, action)
        default: return state
    }
}

export default reducer;