import { MemesAPI } from "../api/api"

const SET_MEMES = 'SET_MEMES'

const initialState = {
    memes: []
}

export const memeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMES:
            return {...state, memes: action.memes}
        default:
            return state
    }
}

const setMemes = (memes) => {
    return {type: SET_MEMES, memes}
}

export const getMemes = () => (dispatch) => {
    MemesAPI.getMemes().then((response) => {
        console.log(response);
        dispatch(setMemes(response.data.memes))
    })
}