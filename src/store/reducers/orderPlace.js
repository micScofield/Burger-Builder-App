import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const initialState = {
    order : [],
    loading: false,
    showModalForSuccess: false,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER: return updateState(state, {loading: true})

        case actionTypes.STORE_ORDER: return updateState(state, {loading: false,
            showModalForSuccess: true,
            order: state.order.concat(action.order),
            error: false})

        case actionTypes.PLACE_ORDER_FAILED: return updateState(state, {loading: false,
            showModalForSuccess: false,
            error: true})

        case actionTypes.MODAL_HIDE: return updateState(state, {showModalForSuccess: false, loading: false})
        default: return state
    }
}

export default reducer;