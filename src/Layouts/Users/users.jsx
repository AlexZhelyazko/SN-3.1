import './users.sass'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersTC, setFetching, toggleFollowUser } from "../../redux/users-reducer"
import { NavLink } from "react-router-dom"
import { Preloader } from "../../components/Preloader/preloader"
import { Button } from '../../components/Button/button'
import { useCallback } from 'react'

export const Users = () => {
    const [value, setValue] = useState('')
    let newUserList = []
    let users = useSelector((state) => state.users)
    let dispatch = useDispatch()

    const toggleFollowing = (id, following) => {
        dispatch(toggleFollowUser(id, following))
    }

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

    newUserList = users.users.filter((user) => user.name.toLowerCase().includes(value.toLowerCase())).map(el => {
        return <div className="users__page-user">
            <NavLink to={`/users/${el.id}`}>
                <img className="users__page-image" src={el.photos.small || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt="User Icon" />
            </NavLink>
            <NavLink to={`/users/${el.id}`}>
                <span className="users__page-name">{el.name}</span>
            </NavLink>
            {el.followed 
            ? <Button name = 'Unfollow' id={el.id} following={true} toggleFollowing={toggleFollowing}>Unfollow </Button> 
            : <Button name = 'Follow' id={el.id} following={false} toggleFollowing={toggleFollowing}>Follow</Button>
            }
        </div>
    })

    return (
        <div className='users__page-container'>
            <input type="search" onChange={(event) => setValue(event.target.value)}/>
            {newUserList.length === 0 ? <Preloader /> : newUserList}
        </div>
    )
}