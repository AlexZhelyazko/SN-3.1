import { Outlet } from "react-router-dom"
import { Header } from "../../Layouts/Header/header"
import { Sidebar } from "../../Layouts/Sidebar/sidebar"
import './layout.sass'

export const Layout =  () => {
    return (
        <>
            <Header/>
            <div className="layout__wrap">
                <Sidebar/>
                <Outlet/>
            </div>
        </>
    )
}