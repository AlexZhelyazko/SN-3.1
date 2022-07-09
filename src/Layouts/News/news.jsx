import './news.sass'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Preloader } from "../../components/Preloader/preloader"
import { setNewsSection, setNewsTC } from "../../redux/news-reducer"
import { NavLink, useMatch } from 'react-router-dom'
import { setCurrentNewsItem } from '../../redux/news-reducer'
import { news } from '../../data/data'

export const NewsSections = () => {
    const dispatch = useDispatch()
    return (
        <div className='news__chooser-container'>
            {news.map((el) => {
                return <NavLink onClick={() => dispatch(setNewsSection(el.title.toLowerCase()))} to={`/news/${el.title.toLowerCase()}`} className='news__chooser' style={{backgroundImage:`url(${el.url})`}}>
                    {el.title}
                </NavLink>
            })}
        </div>
    )
}

export const News = () => {
    let newsArray = useSelector((state) => state.news)
    const match = useMatch('/news/:section')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setNewsTC(match.params.section))
    }, [])

    return (

        <div className="news__wrapper">
            {newsArray.news.length === 0 ? <Preloader /> : <div>{newsArray.news.map((el, index) => {
                return (
                    <NavLink onClick={() => dispatch(setCurrentNewsItem(index))} to={`/news/${index}`} className={index % 7 === 0 ? "news__content-main" : "news__content"}>
                        <span className={index % 7 === 0 ? 'news__title-main' : 'news__title'}>{el.title}</span>
                        <img className={index % 7 === 0 ? "news__image-main" : "news__image"}
                            src={index % 7 === 0 ? el?.multimedia?.[0]?.url : el?.multimedia?.[1]?.url}
                            alt={el?.multimedia?.[2]?.caption} />
                    </NavLink>
                )
            })}</div>}
        </div>
    )
}


export const NewsItem = () => {
    const news = useSelector((state) => state.news)
    let index = news.currentNewsItem
    console.log(news);
    return (
        <div>
            <div>
                <h1>{news.news[index].title}</h1>
                <span>{news.news[index].published_date}</span>
                <span>{news.news[index].byline}</span>
            </div>
            <img src={news.news[index].multimedia[1].url} alt="" />
            <div>{news.news[index].abstract}</div>
        </div>
    )
}