import { Home } from "@material-ui/icons"
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import HomePage from "../home/HomePage"
import CourseDescription from "../courseDescription/CourseDescription"
import LoginPage from "../login/LoginPage"
import ProfilePage from "../profile/ProfilePage"
import SurveyPage from "../survey/SurveyPage"
import LargeHeader from "../general/LargeHeader"
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
                        <Route path="/SearchResult" component={HomePage} />
                        <Route path="/CourseDetail/:courseName" component={CourseDescription} />
                        <Route path="/login" component={LoginPage}/>
                    </Switch>
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
