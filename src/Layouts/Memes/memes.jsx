import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getMemes } from "../../redux/meme-reducer"
import './meme.sass'

export const Memes = () => {
    const dispatch = useDispatch()
    let memes = useSelector((state) => state.memes)
    useEffect(() => {
        console.log('Effect');
        dispatch(getMemes())
    }, [])
    return (
        <div className="meme__wrapper">
            {memes.memes.map((el) => {
                return <div className="meme">
                    <div className="meme__title">{el.title} by {el.author}</div>
                    <img className="meme__image" src={el.preview[3] || el.url }  alt="" />
                </div> 
            })}
            <div className="meme__button" onClick={() => dispatch(getMemes())}>Next Meme</div>
        </div>
    )
}