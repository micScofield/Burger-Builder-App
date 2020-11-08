import { put } from 'redux-saga/effects'
import { delay, call, all } from 'redux-saga/effects'
//import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'
import * as actions from '../actions/index'

export function* authLogoutSaga(action) {
    yield localStorage.clear()
    yield put(actions.DidLogout())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.authLogout())
}

export function* authUserSaga(action) {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLqBWYQeBqqCdmYvrPfLfE1BiDHabhIYI'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLqBWYQeBqqCdmYvrPfLfE1BiDHabhIYI'
    }

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    yield put(actions.authStart())
    try {
        let response = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)

        //eg of call helper
        // yield call([localStorage, 'setItem'], 'token', response.data.idToken)
        // yield call([localStorage, 'setItem'], 'expirationDate', expirationDate)
        // yield call([localStorage, 'setItem'], 'userId', response.data.localId)

        //eg of all helper
        yield all([
            call([localStorage, 'setItem'], 'token', response.data.idToken),
            call([localStorage, 'setItem'], 'expirationDate', expirationDate),
            call([localStorage, 'setItem'], 'userId', response.data.localId)
        ])

        //yield localStorage.setItem('token', response.data.idToken)
        //yield localStorage.setItem('expirationDate', expirationDate)
        //yield localStorage.setItem('userId', response.data.localId)

        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFailed(error.response.data.error.message))
    }
}

export function* authCheckState(action) {
    const token = yield localStorage.getItem('token')
    const expirationDate = yield localStorage.getItem('expirationDate')
    const userId = yield localStorage.getItem('userId')

    if (token) {
        if (new Date(expirationDate) > new Date()) {
            yield put(actions.authSuccessOnRefresh(token, userId))
            yield put(actions.checkAuthTimeout((new Date(expirationDate).getTime() - new Date().getTime()) / 1000))
        }
    } else {
        yield put(actions.authLogout())
    }
}