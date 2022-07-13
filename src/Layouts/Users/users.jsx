import './users.sass'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersTC, setFetching, toggleFollowUser } from "../../redux/users-reducer"
import { NavLink } from "react-router-dom"
import { Preloader } from "../../components/Preloader/preloader"
import { Button } from '../../components/Button/button'
import { useCallback } from 'react'
import { UsersList } from './UsersList/userslist'

export const Users = () => {
    const [value, setValue] = useState('')
    let newUserList = []
    let fetching = useSelector((state) => state.users.fetching)
    let pageSize = useSelector((state) => state.users.pageSize)
    let users = useSelector((state) => state.users.users)
    let currentPage = useSelector((state) => state.users.currentPage)

    let dispatch = useDispatch()

    const toggleFollowing = (id, following) => {
        dispatch(toggleFollowUser(id, following))
    }

    useEffect(() => {
        if(fetching) {
            dispatch(getUsersTC(pageSize, currentPage))
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)

        return function() {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch(setFetching(true))
        }
    }

    return (
        <div className='users__page-container'>
            <input type="search" onChange={(event) => setValue(event.target.value)}/>
            {users.length === 0 ? <Preloader/> : <UsersList users = {users} value = {value} toggleFollowing = {toggleFollowing}/>}
        </div>
    )
}