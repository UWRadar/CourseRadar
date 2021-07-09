import React, { Component } from "react"
import CourseCard from "../general/CourseCard"
import "./SearchResultPage.css"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ServerConfig from "../config/ServerConfig";

export default class SearchResultPage extends Component {

// const SearchResultPage = (props) => {
    constructor(props) {
        super(props);
        this.state = {
            courseCards: [],
            courseName: "",
            courseLevel: "",
            courseCredit: "",
            courseCreditType: "",
            // subCourseCards: [],
            selectLevel: "",
            selectCredit: "",
            selectCreditType: "",
            loaded: false,

        }
    }

    componentDidMount() {
        let curCourseName = localStorage.getItem("courseName");
        let curLevel = localStorage.getItem("level");
        let curCredit = localStorage.getItem("credit");
        let curCreditType = localStorage.getItem("creditType");
        if (curCourseName != "" || curLevel != "" || curCredit != "" || curCreditType != "") {
            this.processSearchResult(curCourseName, curLevel, curCredit, curCreditType);
        } else {
            this.setState({loaded: true});
        }
    }

    componentDidUpdate(props) {
        let curFilters = props.history.location.state;
        if (curFilters[0] != this.state.courseName ||
            curFilters[1] != this.state.courseLevel ||
            curFilters[2] != this.state.courseCredit ||
            curFilters[3] != this.state.courseCreditType) {
            let curCourseName = localStorage.getItem("courseName");
            let curLevel = localStorage.getItem("level");
            let curCredit = localStorage.getItem("credit");
            let curCreditType = localStorage.getItem("creditType");
            if (curCourseName != "" || curLevel != "" || curCredit != "" || curCreditType != "") {
                if (this.state.loaded) {
                    this.processSearchResult(curCourseName, curLevel, curCredit, curCreditType);
                }
            }
        }
        // if (this.state.courseCards.length != 0) {
        //     let curCourseName = localStorage.getItem("courseName");
        //     let curLevel = localStorage.getItem("level");
        //     let curCredit = localStorage.getItem("credit");
        //     let curCreditType = localStorage.getItem("creditType");
        //     this.processSearchResult(curCourseName, curLevel, curCredit, curCreditType);
        // }
    }


    processSearchResult(curCourseName, curLevel, curCredit, curCreditType) {
        this.setState({
            courseName: curCourseName,
            courseLevel: curLevel,
            courseCredit: curCredit,
            courseCreditType: curCreditType,
            loaded: false,
        })

        const url = ServerConfig.SERVER_URL + "/api/search";
        let currentUrl = url;

        // check courseName
        if (curCourseName != "") {
            if (currentUrl === url) {
                currentUrl += "?";
            }
            currentUrl += "courseName=" + curCourseName;
        }
        // check level
        if (curLevel != "") {
            if (currentUrl === url) {
                currentUrl += "?level=" + curLevel;
            } else {
                currentUrl += "&level=" + curLevel;
            }
        }
        // check credit
        if (curCredit != "") {
            if (currentUrl === url) {
                currentUrl += "?credit=" + curCredit;
            } else {
                currentUrl += "&credit=" + curCredit;
            }
        }
        // check creditType
        if (curCreditType != "") {
            if (currentUrl === url) {
                currentUrl += "?creditType=" + curCreditType;
            } else {
                currentUrl += "&creditType=" + curCreditType;
            }
        }

        console.log(currentUrl);

        fetch(currentUrl)
            .then(checkStatus)
            // .then(res => res.json())
            .then(res => {
                console.log(res.result);
                let courses = res.result;
                let courseTemp = [];
                for (let i = 0; i < courses.length; i++) {
                    let course = courses[i];
                    courseTemp.push({
                        courseName: course.courseName,
                        courseDescription: course.courseFullName,
                        tags: course.creditType.split("/"),
                        credit: course.credit[0]
                    })
                }
                this.setState({
                    courseCards: courseTemp,
                    loaded: true
                })
            })
            .catch(this.setState({courseCards: []}));
    }

    render() {

        const onChangeLevel = (event) => {
            this.setState({selectLevel: event.target.value});
            // setSubCourseCards();
        }

        const onChangeCredit = (event) => {
            this.setState({selectCredit: event.target.value});
            // setSubCourseCards();
        }

        const onChangeCreditType = (event) => {
            this.setState({selectCreditType: event.target.value});
            // setSubCourseCards();
        }

        const setSubCourseCards = () => {
            let tempSubCourseCards = [];
            let courseCards = this.state.courseCards;
            let fitLevel = false;
            let fitCredit = false;
            let fitCreditType = false;
            if (this.state.selectLevel == "") {
                fitLevel = true;
            }
            if (this.state.selectCredit == "") {
                fitCredit = true;
            }
            if (this.state.selectCreditType == "") {
                fitCreditType = true;
            }
            for (let i = 0; i < courseCards.length; i++) {
                if (this.state.selectLevel != "") {
                    fitLevel = false;
                    let tempCourseNum = parseInt(courseCards[i].courseName.match(/\d+/g));
                    let tempLevel = parseInt(this.state.selectLevel);
                    let difference = tempCourseNum - tempLevel;
                    if (difference >= 0 && difference < 100) {
                        fitLevel = true;
                    }
                }
                if (this.state.selectCredit != "") {
                    fitCredit = false;
                    if (courseCards[i].credit == this.state.selectCredit) {
                        fitCredit = true;
                    }
                }
                if (this.state.selectCreditType != "") {
                    fitCreditType = false;
                    if (courseCards[i].tags.includes(this.state.selectCreditType.toUpperCase())) {
                        fitCreditType = true;
                    }
                }
                if (fitLevel && fitCredit && fitCreditType) {
                    tempSubCourseCards.push(courseCards[i]);
                }
            }
            // this.setState({subCourseCards: tempSubCourseCards});

            if (tempSubCourseCards.length == 0) {
                return<img className="no-result" src="../img/no-result.png" alt="no results"/>

            } else {
                return tempSubCourseCards.map(element => (
                    <CourseCard
                        courseName={element.courseName}
                        courseDescription={element.courseDescription}
                        tags={element.tags}
                        credit={element.credit}
                    />
                ));
            }
        }

        return (
            <div className="search-result">
                <div className="filter">
                    <h1>筛选</h1>
                    <h2>课程级别</h2>
                    <RadioGroup value={this.state.selectLevel} onChange={onChangeLevel}>
                        <FormControlLabel value="100" control={<Radio />} label="100" />
                        <FormControlLabel value="200" control={<Radio />} label="200" />
                        <FormControlLabel value="300" control={<Radio />} label="300" />
                        <FormControlLabel value="400" control={<Radio />} label="400" />
                        <FormControlLabel value="" control={<Radio />} label="all levels" />
                    </RadioGroup>
                    <h2>学分</h2>
                    <RadioGroup value={this.state.selectCredit} onChange={onChangeCredit}>
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                        <FormControlLabel value="" control={<Radio />} label="all credits" />
                    </RadioGroup>
                    <h2>通识教育要求</h2>
                    <RadioGroup value={this.state.selectCreditType} onChange={onChangeCreditType}>
                        <FormControlLabel value="C" control={<Radio />} label="C" />
                        <FormControlLabel value="DIV" control={<Radio />} label="DIV" />
                        <FormControlLabel value="I&S" control={<Radio />} label="I&S" />
                        <FormControlLabel value="None" control={<Radio />} label="None" />
                        <FormControlLabel value="NW" control={<Radio />} label="NW" />
                        <FormControlLabel value="QSR" control={<Radio />} label="QSR" />
                        <FormControlLabel value="VLPA" control={<Radio />} label="VLPA" />
                        <FormControlLabel value="W" control={<Radio />} label="W" />
                        <FormControlLabel value="" control={<Radio />} label="all credit types" />
                    </RadioGroup>
                </div>
                <div className="course-list">
                    {!this.state.loaded &&
                        <div class="loading-small">
                                <img class = 'loading' src="../img/loading.gif" alt="Logo for loading" />
                        </div>
                    }
                    {this.state.loaded &&
                        setSubCourseCards()}
                </div>
            </div>
        )
    }
}

function checkStatus(response) {
    if (response.ok) {
        if (response.status == 200) {
            console.log(response);
            return response.json()
        } else {
            return {result: []};
        }

    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText))
    }
}