import { profileReducer } from './profile-reducer';
import { usersReducer } from './users-reducer';
import { dialogsReducer } from './dialogs-reducer';
import { authReducer } from './auth-reducer';
import {newsReducer} from './news-reducer';
import {settingsReducer} from './settings-reducer';
import { applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { initializeReducer } from './app-reducer';
import { memeReducer } from './meme-reducer';


let reducers = {
    profile: profileReducer,
    users: usersReducer,
    dialogs: dialogsReducer,
    news: newsReducer,
    settings: settingsReducer,
    auth: authReducer,
    initialize: initializeReducer,
    memes: memeReducer
}

let store = configureStore({reducer: reducers}, applyMiddleware(thunkMiddleware));

export default store;