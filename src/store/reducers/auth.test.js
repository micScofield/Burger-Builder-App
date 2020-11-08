import { configure, shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

configure({adapter: new EnzymeAdapter()})

describe('Auth reducer', () => {
    let wrapper;
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
    it('should return initial state', () => {
        wrapper = reducer(undefined, {} )   // two JS args, initial state, and action. Action can be {} for simulation
        expect(wrapper).toEqual(initialState)
    })

    it('should store token in store if we are authenticated', () => {
        wrapper = (reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            userId: 'Some Id',
            idToken: 'Some Token',
            showModalForSuccess: true, 
            loading: false,
            loggedIn: true,
        } ))
        expect(wrapper).toEqual({      
            loggedIn: true,
            error: false,
            loading: false,
            userId: 'Some Id',
            idToken: 'Some Token',
            showModalForSuccess: true,
            showModalForFailure: false,
            redirectAuthPath: null
        })
    })
})