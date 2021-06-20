import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


import SortIcon from '@material-ui/icons/Sort';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchFilter from "./SearchFilter";

import "./LargeHeader.css"

export default function LargeHeader() {
    return (
        <div>
            <AppBar id='large-header'>
                <img src="./img/courseRadar.png" id="course-radar" alt="logo for course radar">
                </img>
                <div id="search-bar">
                    <SearchFilter/>
                </div>
                <div id="right-upper-icons">
                    <div class="logo-with-characters">
                        <img src="./img/pen.png" id="pen" class="header-logo" alt="logo for filling forms"/>
                        <p>填写课评</p>
                    </div>
                    <div class="logo-with-characters">
                        <img src="./img/log-in.png" id="log-in" class="header-logo" alt="logo for logging in"/>
                        <p>登录</p>
                    </div>
                </div>

            </AppBar>
        </div>
    )
}