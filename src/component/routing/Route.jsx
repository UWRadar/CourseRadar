import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import HomePage from "../home/HomePage"
import LoginPage from "../login/LoginPage"
import ProfilePage from "../profile/ProfilePage"
import SearchResultPage from "../search/SearchResultPage"
import SurveyPage from "../survey/SurveyPage"
import PrivacyPolicy from "../privacyPolicy/privacyPolicy"
// import SearchResultPage from "../search-result-page/SearchResultPage"
import LargeHeader from "../general/LargeHeader"
import CourseDescription from "../courseDescription/CourseDescription"
import Footer from "../general/Footer"
import PopupAd from "../general/PopupAd";
export default class Routing extends Component {

    constructor() {
        super();
        this.filter = {
            courseName: "",
            creditType: [],
            credit: -1,
            level: -1
        };
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
                creditType: [],
                credit: -1,
                level: -1
            },
            showPopupAd: (() => {
                // temporary until 2024-02-25 15:30 (GMT+8)
                const closeTime = new Date("Feb 25, 2024 15:30:00 GMT+08:00").getTime();
                const storedTimeStamp = localStorage.getItem("popupClicked");
                const timeDifference= storedTimeStamp ? new Date().getTime() - storedTimeStamp : 0;
                const thirtyMinutes = 30 * 60 * 1000;
                return window.self === window.top &&
                    new Date().getTime() < closeTime &&
                    (!timeDifference || timeDifference > thirtyMinutes);
            })()
        };
    }

    updateFilter(newFilters) {
        this.setState({ filter: newFilters });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <LargeHeader
                        updateFilter={(filter) => this.updateFilter(filter)}
                        filter={this.state.filter} />

                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route path="/survey" component={SurveyPage} />
                        <Route path="/privacyPolicy" component={PrivacyPolicy} />
                        {/* David Xie: re-do router for better search result display, so we will use /search/cse142?course_level=100,200&credit_number=1,2&course_type=c,div*/}
                        {/* Reason: easier to implement no course was found, easier to trigger search action from another component, ability to better handle users go back to search page via back button, ability to bookmark search result page*/}
                        <Route path="/search/:courseName" component={SearchResultPage} />
                        <Route exact={true} path="/search" ><Redirect to="/search/all" /> </Route>
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
                    {this.state.showPopupAd && <PopupAd dismiss={() => {
                        this.setState({
                            showPopupAd: false
                        });
                    }} />}
                </div>
            </Router>
        );
    }
}
