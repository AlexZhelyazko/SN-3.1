import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getMemes, setPage } from "../../redux/meme-reducer"

export const Memes = () => {
    const dispatch = useDispatch()
    let memes = useSelector((state) => state.memes)
    console.log(memes);
    useEffect(() => {
        dispatch(getMemes(memes.page))
    }, [memes.page])
    return (
        <div>
            <div onClick={() => dispatch(setPage(memes.page - 1))}>LEFT</div>
            {memes.memes.map((el) => {
                return <div>
                    <div>
                        <div>{el.name}</div>
                        <img src={el.url} alt="" />
                    </div>
                </div>
            })}
            <div onClick={() => dispatch(setPage(memes.page + 1))}>RIGHT</div>
        </div>
    )
}