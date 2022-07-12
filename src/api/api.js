import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '4e0c2e3a-1448-441a-bba9-5de74fac940c'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0'
})

export const AuthAPI = {
    authUser() {
        let data = instance.get(`/auth/me`)
        return data
    },
    loginUser(email, password, rememberMe) {
        return instance.post(`/auth/login`, {email, password, rememberMe})
    },
    logoutUser() {
        return instance.delete(`/auth/login`)
    }
}

export const ProfileAPI = {
    getProfile(userID) {
        return instance.get(`/profile/${userID}`)
    },
    getStatus(userID) {
        return instance.get(`/profile/status/${userID}`)
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status})
    }
}

export const UsersAPI = {
    followUser(id) {
        return instance.post(`/follow/${id}`)
    },
    unfollowUser(id) {
        return instance.delete(`/follow/${id}`)
    },
    getUsers(pageSize=20, currentPage=1) {
        return instance.get(`/users?count=${pageSize}&page=${currentPage}`)
    },
}

export const NewsAPI = {
    getNews(section) {
        return axios.get(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=NlMNsLNai1ZgV0g8hhHIr1bkVSrRhR3n`)
    }
}

export const MemesAPI = {
    getMemes(page) {
        return axios.get(`https://meme-api.herokuapp.com/gimme/${page}`)
    }
}