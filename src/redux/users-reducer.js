import { UsersAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_FETCHING = 'SET_FETCHING'

const initialState = 
{
    users: [],
    currentPage: 1,
    totalUsersCount: 0,
    pageSize: 20,
    fetching: true,
}

export let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.id){
                        return {...user, followed: true}
                    }
                    else {
                        return {...user}
                    }
                })
            }
            case UNFOLLOW:
                return {
                    ...state,
                    users: state.users.map((user) => {
                        if (user.id === action.id){
                            return {...user, followed: false}
                        }
                        else {
                            return {...user}
                        }
                    })
                }
            case SET_USERS:
                return {
                    ...state,
                    users: [...state.users, ...action.users]
                }
            case SET_CURRENT_PAGE:
                return {
                    ...state,
                    currentPage: action.currentPage
                }
            case SET_TOTAL_USERS_COUNT:
                return {
                    ...state,
                    totalUsersCount: action.totalUsersCount
                }
            case SET_FETCHING:
                return {
                    ...state,
                    fetching: action.fetching
                }
        default:
            return state
    }
}

export const follow = (userID) => {
    return {type: FOLLOW, id: userID}
}

export const unfollow = (userID) => {
    return {type: UNFOLLOW, id: userID}
}

export const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
}

export const setFetching = (fetching) => {
    return {type: SET_FETCHING, fetching}
}

export const getUsersTC = (pageSize, currentPage) => {
    return (dispatch) => {
        UsersAPI.getUsers(pageSize, currentPage).then((response) => {
            dispatch(setTotalUsersCount(response.data.totalCount))
            let users = response.data.items;
            dispatch(setUsers(users));
            dispatch(setCurrentPage(currentPage+1))
        })
        .finally(() => {
            dispatch(setFetching(false))
        })
    }
}