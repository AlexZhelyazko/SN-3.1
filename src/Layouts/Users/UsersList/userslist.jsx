import { NavLink } from "react-router-dom"
import { Button } from "../../../components/Button/button"

export const UsersList = ({users, value, toggleFollowing}) => {
    return (
        users.filter((user) => user.name.toLowerCase().includes(value.toLowerCase())).map(el => {
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
    )
}