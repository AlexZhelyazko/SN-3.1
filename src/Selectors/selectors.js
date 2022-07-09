import { createSelector } from "@reduxjs/toolkit"

export const getIsAuth = (state) => {
    return state.auth.isAuth
}