import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import ProfilePage from "../profile/ProfilePage"
import SearchResultPage from "../home/SearchResultPage"
import SurveyPage from "../survey/SurveyPage"
// import SearchResultPage from "../search-result-page/SearchResultPage"
import LargeHeader from "../general/LargeHeader"
import CourseDescription from "../courseDescription/CourseDescription"
import Footer from "../general/Footer"
export default class Routing extends Component {

    constructor() {
        super()
        this.filter = {
            courseName: "",
            creditType:[],
            credit: -1,
            level: -1
        }
        this.state = {
            id: "info",
            loggedIn: false,
            loggedInUser: "",
            usingIp: false,
            openLoginWindow: false,
            width: 0,
            reinitializeDraw: false,
            filter: {
                courseName: "",
                creditType:[],
                credit: -1,
                level: -1
            }
        }
    }

    

    updateFilter(newFilters) {
        this.setState({filter: newFilters})
    }
 
    render() {
        return (
            <Router>
                <div className="App">
                    <LargeHeader 
                        updateFilter={(filter) => this.updateFilter(filter)} 
                        filter={this.state.filter}/>
                    
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route path="/survey" component={SurveyPage} />
                        <Route path="/search">
                            <SearchResultPage 
                                filter={this.state.filter}
                                updateFilter={(filter) => this.updateFilter(filter)}
                            />
                        </Route>
                        <Route path="/CourseDetail/:courseName" component={CourseDescription} />
                        <Route path="/login" component={LoginPage} />
                    </Switch>
                    <Footer />
                    {/* <Fab
                        className="fab"
                        color="primary"
                        aria-label="返回首页"
                        onClick={() => {
                            window.location.href = "/";
                        }}>
                        <HomeIcon />
                    </Fab> */}
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
