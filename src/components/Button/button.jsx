import './button.sass'

export const ButtonF = ({name, id, following, toggleFollowing}) => {
    const toggle = (id, following) => {
        return toggleFollowing(id, following)
    }
    return (
        <button className="button__component" onClick={() => toggle(id, following)}>{name}</button>
    )
} 