import { useSelector } from "react-redux"
import { NewsAPI } from "../api/api"

const SET_NEWS = 'SET_NEWS'
const SET_CURRENT_NEWS = 'SET_CURRENT_NEWS'
const SET_NEWS_SECTION = 'SET_NEWS_SECTION'

const initialState = {
    news: [],
    currentNewsItem: null,
    newsSection: ''
}

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEWS:
            return {...state, news: action.news}
        case SET_CURRENT_NEWS:
            return {...state, currentNewsItem: action.currentNewsItem}
        case SET_NEWS_SECTION:
            return {...state, newsSection: action.section}
        default:
            return state
    }
}

const setNews = (news) => {
    return {type: SET_NEWS, news}
}

export const setNewsSection = (section) => {
    return {type: SET_NEWS_SECTION, section}
}

export const setCurrentNewsItem = (currentNewsItem) => {
    return {type: SET_CURRENT_NEWS, currentNewsItem}
}

export const setNewsTC = (section) => (dispatch) => {
    NewsAPI.getNews(section).then((response) => {
        dispatch(setNews(response.data.results))
    })
}