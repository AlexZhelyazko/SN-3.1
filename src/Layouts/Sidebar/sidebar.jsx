import React from "react";
import { NavLink } from "react-router-dom";
import './sidebar.sass'

const links = [
    { url: '/profile', name: 'Profile' },
    { url: '/users', name: 'Users' },
    { url: '/dialogs', name: 'Dialogs' },
    { url: '/news', name: 'News' },
    { url: '/settings', name: 'Settings' },
];

export const Sidebar = (props) => {
    return (
        <aside>
            <nav>
                {links.map
                    (link => <NavLink style={({ isActive }) => isActive ? { color: 'gold' } : undefined} to={link.url}>{link.name}</NavLink>)}
            </nav>
        </aside>
    )
}