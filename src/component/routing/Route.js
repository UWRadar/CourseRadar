import { Home } from "@material-ui/icons"
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import ProfilePage from "../profile/ProfilePage"
import SearchResultPage from "../home/SearchResultPage"
import SurveyPage from "../survey/SurveyPage"
import LargeHeader from "../general/LargeHeader"
import CourseDescription from "../courseDescription/CourseDescription"
import Footer from "../general/Footer"
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
                        <Route path="/profile/:username" component={ProfilePage} />
                        <Route path="/survey" component={SurveyPage} />
                        <Route path="/search/:searchTerm" component={SearchResultPage} />
                        <Route path="/CourseDetail/:courseName" component={CourseDescription} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                    <Footer />
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
