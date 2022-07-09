import { AuthAPI } from "../api/api"

const AUTH_USER = 'AUTH_USER'
const TOGGLE_IS_LOADED = 'TOGGLE_IS_LOADED'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

const initialState = {
    id: null,
    email: '',
    login: 'User',
    isAuth: null,
    isLoaded: false,
    errorMessage: '',
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, ...action }
        case TOGGLE_IS_LOADED: {
            let stateCopy = { ...state }
            stateCopy.isLoaded = action.value
            return stateCopy
        }
        case SET_ERROR_MESSAGE: {
            let stateCopy = { ...state }
            stateCopy.errorMessage = action.message
            return stateCopy

        }
        default:
            return state
    }
}

export const toggleIsLoaded = (value) => {
    return { type: TOGGLE_IS_LOADED, value }
}

export const authUser = (id, email, login, isAuth, isLoaded = false) => {
    return { type: AUTH_USER, id, email, login, isAuth }
}

export const setErrorMessage = (message) => {
    return { type: SET_ERROR_MESSAGE, message }
}

export const authUserTC = () => (dispatch) => {
    dispatch(toggleIsLoaded(true))
    return AuthAPI.authUser().then((response) => {
        let isAuth = true
        if (response.data.resultCode) isAuth = false
        let { id, email, login } = response.data.data
        dispatch(authUser(id, email, login, isAuth))
    })
}


export const loginUserTC = (email, password, rememberMe) => {
    return (dispatch) => {
        dispatch(toggleIsLoaded(true))
        AuthAPI.loginUser(email, password, rememberMe).then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(toggleIsLoaded(false))
                dispatch(authUserTC())
            }
            else {
                let errorMessage = response.data.messages;
                dispatch(setErrorMessage(errorMessage))
            }
        })
    }
}

export const logOutUserTC = () => {
    return (dispatch) => {
        AuthAPI.logoutUser().then((response) => {
            dispatch(authUserTC())
        })
    }
}