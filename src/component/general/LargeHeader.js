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

import "./LargeHeader.css"

export default function LargeHeader() {
    return (
        <div>
            <AppBar id='large-header'>
                <img src="./img/original6.png" id="course-radar" alt="logo for course radar"></img>
                <img src="./img/original.png" id="course-radar2" alt="logo for course radar mobile"></img>
                <div id="search-bar">
                    <SearchDropDown/>
                    <InputBase id="large-header-input"
                        placeholder="想要找什么课～..."
                    />
                    <SearchIcon id="search-icon"/>
                </div>
                <div id="right-upper-icons">
                
                    <button type="button" class="logo-with-characters">
                        <img src="./img/edit.png" id="pen" className="header-logo" alt="logo for filling forms"/>
                        <p>填写课评</p>
                    </button>

                    <button type="button" class="logo-with-characters">
                        <img src="./img/log-in.png" id="pen" className="header-logo" alt="logo for filling forms"/>
                        <p>填写课评</p>
                    </button>
                </div>

            </AppBar>
        </div>
    )
}   