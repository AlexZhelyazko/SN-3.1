import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useMatch, Navigate } from "react-router-dom"
import { getProfileTC, getStatusTC, updateStatusTC } from "../../redux/profile-reducer";
import './profile.sass'

export const Profile = (props) => {
    const [statusChange, setStatusChange] = useState(false)
    const [value, setValue] = useState('')
    let location = useLocation();
    const match = useMatch('/users/:userId')
    const dispatch = useDispatch()
    const authID = useSelector((state) => state.auth.id)
    const profileInfo = useSelector((state) => state.profile.profile.profileInfo)
    const profileStatus = useSelector((state) => state.profile.status)
    useEffect(() => {
        let userId = match?.params?.userId || authID;
        dispatch(getProfileTC(userId))
        dispatch(getStatusTC(userId))
    },[match, authID])
    return (
        <div className="profile">
            <div>About Me: {profileInfo?.aboutMe || '...'}</div>
            <div>{profileInfo?.fullName}</div>
            <div><img src={profileInfo?.photos?.small || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'} alt="photo" /></div>
            <div>
                <div>Status: {profileStatus || null}</div>
                <button onClick={() => setStatusChange(true)} style={location.pathname === '/profile' && !statusChange ? {display: 'inline-block'} : {display: 'none'}}>Change Status</button>
                <input onChange={(event) => setValue(event.target.value)} style={location.pathname === '/profile' && statusChange ? {display: 'inline-block'} : {display: 'none'}}></input>
                <button onClick={() => {
                    setStatusChange(false)
                    dispatch(updateStatusTC(value, authID))
                }}
                style={location.pathname === '/profile' && statusChange ? {display: 'inline-block'} : {display: 'none'}}>Save</button>
            </div>
        </div>
    )
}