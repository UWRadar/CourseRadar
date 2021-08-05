import React, { Component } from "react"
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SearchFilter from "./SearchFilter";
import ServerConfig from "../config/ServerConfig"
import { NavLink } from 'react-router-dom'
import "./LargeHeader.css"
import MenuIcon from '@material-ui/icons/Menu';
import {withRouter} from 'react-router-dom';
class LargeHeader extends Component {
    constructor() {
        super();
        this.state = {
            pathOfPersonIcon: "/profile",
            anchorEl: null
        }
    }

    componentDidMount() {
        fetch(ServerConfig.SERVER_URL + "/api/userinfo", {
            credentials: "include"
        }).then(response => {
            if (response.ok) {

            } else if (response.status == 403) {
                this.setState({
                    pathOfPersonIcon: "/login"
                })
            }
        })
    }


    render() {
        const handleClick = (event) => {
            this.setState({anchorEl: event.currentTarget})
        }

        const handleClose = () => {
            this.setState({anchorEl: null})
        }

        const goHome = () => {
            this.props.history.push("/")
        }
        return (<div>
            <AppBar id='large-header'>
                <img src="./img/original6.png" id="course-radar" alt="logo for course radar" onClick={() => {goHome()}}></img>
                <img src="./img/original.png" id="course-radar2" alt="logo for course radar mobile" onClick={() => {goHome()}}></img>

                <SearchFilter className="search-bar" className="search_bar" />

                <div id="right-upper-icons">
                    <NavLink
                        className="logo-with-characters"
                        to="/survey"
                    >
                        <img src="./img/edit.png" id="pen" class="header-logo" alt="logo for filling forms" />
                        <p>填写课评</p>
                    </NavLink>

                    <NavLink
                        to={this.state.pathOfPersonIcon}
                        className="logo-with-characters"
                        
                    >
                        <img src="./img/log-in.png" id="log-in" class="header-logo" alt="logo for logging in" />
                        <p>{this.state.pathOfPersonIcon === "/login" ? "登录" : "个人"}</p>
                    </NavLink>

                </div>

                <Button aria-controls="simple-menu2" id="simple-meanubutton" aria-haspopup="true" onClick={handleClick}>
                    <MenuIcon></MenuIcon>
                </Button>

                <Menu
                    id="simple-menu2"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={handleClose}>

                    <MenuItem
                        onClick={handleClose}>
                        <NavLink
                            to={this.state.pathOfPersonIcon}
                            className="logo-with-characters">
                            {this.state.pathOfPersonIcon === "/login" ? "登录" : "个人"}
                        </NavLink>
                    </MenuItem>

                    <MenuItem
                        onClick={handleClose}>
                        <NavLink
                            className="logo-with-characters"
                            to="/survey">
                            填写课评
                        </NavLink>
                    </MenuItem>
                </Menu>

            </AppBar>
        </div>
        )
    }
}

export default withRouter(LargeHeader);