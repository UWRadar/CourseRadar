import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';



import SearchFilter from "./SearchFilter";

import SortIcon from '@material-ui/icons/Sort';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NavLink } from 'react-router-dom'
import SearchBar from "./SearchBar"
import "./LargeHeader.css"
import { PinDropSharp } from "@material-ui/icons";

export default function LargeHeader(props) {
    return (
        <div>
            <AppBar id='large-header'>
                <img src="./img/courseRadar.png" id="course-radar" alt="logo for course radar">
                </img>
                <div id="search-bar">
                    <SearchFilter/>
                </div>
                <div id="right-upper-icons">
                    <NavLink
                        className="logo-with-characters"
                        to="/survey"
                    >
                        <img src="./img/edit.png" id="pen" class="header-logo" alt="logo for filling forms" />
                        <p>填写课评</p>
                    </NavLink>

                    <NavLink
                        to="/login"
                        className="logo-with-characters"
                    >
                        <img src="./img/log-in.png" id="log-in" class="header-logo" alt="logo for logging in" />
                        <p>登录</p>
                    </NavLink>

                </div>

            </AppBar>
        </div>
    )
}