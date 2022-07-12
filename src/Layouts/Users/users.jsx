import './users.sass'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersTC, unfollow, follow, setCurrentPage, setFetching } from "../../redux/users-reducer"
import { NavLink } from "react-router-dom"
import { UsersAPI } from "../../api/api"
import { Preloader } from "../../components/Preloader/preloader"

export const Users = () => {
    let newUserList = []
    let users = useSelector((state) => state.users)
    let dispatch = useDispatch()

    useEffect(() => {
        if(users.fetching) {
            dispatch(getUsersTC(users.pageSize, users.currentPage))
        }
    }, [users.fetching])

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

let pages = Math.ceil(users.totalUsersCount / users.pageSize)

    newUserList = users.users.map(el => {
        return <div className="users__page-user">
            <NavLink to={`/users/${el.id}`}>
                <img className="users__page-image" src={el.photos.small || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt="User Icon" />
            </NavLink>
            <NavLink to={`/users/${el.id}`}>
                <span className="users__page-name">{el.name}</span>
            </NavLink>
            {el.followed ? <button onClick={() => {
                UsersAPI.unfollowUser(el.id).then((response) => {
                    if (response.data.resultCode === 0) {
                        dispatch(unfollow(el.id))
                    }
                })
            }}>Unfollow </button> : <button onClick={() => {
                UsersAPI.followUser(el.id)
                    .then((response) => {
                        if (response.data.resultCode === 0) {
                            dispatch(follow(el.id))
                        }
                    })
            }}>Follow</button>
            }
        </div>
    })

    return (
        <div className='users__page-container'>
            <input type="search" />
            {newUserList.length === 0 ? <Preloader /> : newUserList}
        </div>
    )
}