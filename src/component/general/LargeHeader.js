import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import SortIcon from '@material-ui/icons/Sort';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SearchDropDown from "../general/SearchDropDown";
import { NavLink } from 'react-router-dom'
import "./LargeHeader.css"

export default function LargeHeader() {
    return (
        <div>
            <AppBar id='large-header'>
                <img src="./img/courseRadar.png" id="course-radar" alt="logo for course radar">
                </img>
                <div id="search-bar">
                    <SearchDropDown/>
                    <InputBase id="large-header-input"
                        placeholder="想要找啥课啊..."
                    />
                    <SearchIcon id="search-icon"/>
                </div>
                {/* 添加链接 */}
                <NavLink
                    to="/"
                    activeStyle={{
                        color: "black",
                      }}>
                    <div class="logo-with-characters">
                        <img src="./img/pen.png" id="pen" class="header-logo" alt="logo for filling forms"/>
                        <p>填写课评</p>
                    </div>      
                </NavLink>
                <div id="right-upper-icons">
                <NavLink
                    to="/"
                    activeStyle={{
                        color: "black",
                      }}>
                    <div class="logo-with-characters">
                        <img src="./img/log-in.png" id="log-in" class="header-logo" alt="logo for logging in"/>
                        <p>登录</p>
                    </div>
                </NavLink>

                </div>

            </AppBar>
        </div>
    )
}   