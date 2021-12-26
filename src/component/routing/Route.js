import React, { Component } from "react"
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import ProfilePage from "../profile/ProfilePage"
import SearchResultPage from "../home/SearchResultPage"
import SurveyPage from "../survey/SurveyPage"
// import SearchResultPage from "../search-result-page/SearchResultPage"
import LargeHeader from "../general/LargeHeader"
import CourseDescription from "../courseDescription/CourseDescription"
import Footer from "../general/Footer"
import { Fab } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import "../general/Fab.css";

export default class Routing extends Component {

    constructor() {
        super()
        this.state = {
            id: "info",
            loggedIn: false,
            loggedInUser: "",
            usingIp: false,
            openLoginWindow: false,
            width: 0,
            reinitializeDraw: false,
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <LargeHeader />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route path="/survey" component={SurveyPage} />
                        {/* David Xie: re-do router for better search result display, so we will use /search/cse142?course_level=100,200&credit_number=1,2&course_type=c,div*/}
                        {/* Reason: easier to implement no course was found, easier to trigger search action from another component, ability to better handle users go back to search page via back button, ability to bookmark search result page*/}
                        <Route path="/search/:courseName" component={SearchResultPage} />
                        <Route exact={true} path="/search" ><Redirect to="/search/all"/> </Route>
                        <Route path="/CourseDetail/:courseName" component={CourseDescription} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                    <Footer />
                    <Fab
                        className="fab"
                        color="primary"
                        aria-label="返回首页"
                        onClick={() => {
                            window.location.href = "/";
                        }}>
                        <HomeIcon />
                    </Fab>
                </div>
            </Router>
        )
    }
}

function checkStatus(response) {
    if (response.ok) {
        return response.text()
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText))
    }
}
