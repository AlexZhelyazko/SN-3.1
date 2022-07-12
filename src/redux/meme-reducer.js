import { MemesAPI } from "../api/api"

const SET_MEMES = 'SET_MEMES'
const SET_PAGE = 'SET_PAGE'

const initialState = {
    memes: [],
    page: 1,
}

export const memeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MEMES:
            return {...state, memes: action.memes}
        case SET_PAGE:
            return {...state, page: action.page}
        default:
            return state
    }
}

const setMemes = (memes) => {
    return {type: SET_MEMES, memes}
}

export const setPage = (page) => {
    return {type: SET_PAGE, page}
}

export const getMemes = (page) => (dispatch) => {
    MemesAPI.getMemes(page).then((response) => {
        console.log(response);
        dispatch(setMemes(response.data.memes))
    })
}