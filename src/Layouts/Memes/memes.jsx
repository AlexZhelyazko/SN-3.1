import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getMemes } from "../../redux/meme-reducer"

export const Memes = () => {
    const dispatch = useDispatch()
    let memes = useSelector((state) => state.memes)
    console.log(memes);
    useEffect(() => {
        dispatch(getMemes())
    }, [])
    return (
        <div>
            {memes.memes.map((el) => {
                return <div>
                    <div>{el.name}</div>
                    <img src={el.url} alt="" />
                </div>
            })}
        </div>
    )
}