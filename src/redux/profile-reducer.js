import { ProfileAPI } from "../api/api"

const SET_PROFILE_INFO = 'SET_PROFILE_INFO'
const SET_STATUS = 'SET_STATUS'

const initialState = {
    profile: {
        profileInfo: {}
    },
    status: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE_INFO:
            let stateCopy = { ...state }
            stateCopy.profile = { ...state.profile }
            stateCopy.profile.profileInfo = { ...state.profile.profileInfo }
            stateCopy.profile.profileInfo = { ...action.profileInfo }
            return stateCopy
        case SET_STATUS:
            return {...state, status: action.status}
        default:
            return state
    }
}

const setProfileInfo = (profileInfo) => {
    return { type: SET_PROFILE_INFO, profileInfo }
}

const setStatus = (status) => {
    return {type: SET_STATUS, status}
}

export const getProfileTC = (userID) => (dispatch) => {
    if (userID) {
        ProfileAPI.getProfile(userID).then((response) => {
            dispatch(setProfileInfo(response.data))
        })
    }
    else return null
}

export const getStatusTC = (userID) => (dispatch) => {
    if (userID) {
        ProfileAPI.getStatus(userID).then((response) => {
            dispatch(setStatus(response.data))
        })
    }
    else return null
}

export const updateStatusTC = (status, userID) => (dispatch) => {
    ProfileAPI.updateStatus(status).then((response) => {
        dispatch(getStatusTC(userID))
    })
}