import * as actionTypes from '../actions/actionTypes'
import { takeEvery } from 'redux-saga/effects'
import { authLogoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckState } from './auth'

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga)
    yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_STATE_FOR_SAGA, authCheckState)
}