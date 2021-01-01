import { Home } from "@material-ui/icons"
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import HomePage from "../home/HomePage"
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
                    <h2>Empty routing page</h2>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/profile/:username" component={HomePage} />
                        <Route path="/SearchResult" component={HomePage} />
                        <Route path="/CourseDetail/:courseName" component={HomePage} />
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
