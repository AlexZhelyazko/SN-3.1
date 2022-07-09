import { authUserTC } from "./auth-reducer"

const SET_INITIALIZE = 'SET_INITIALIZE'

const initialState = {
    initialize: false
}

export const initializeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZE:
            return {...state, initialize: true}
        default:
            return state
    }
}

const initializeSucces = () => {
    return {type: SET_INITIALIZE}
}

export const initializeTC = () => (dispatch) => {
    let promise = dispatch(authUserTC())
    promise.then(() => {
        dispatch(initializeSucces())
    })
}
