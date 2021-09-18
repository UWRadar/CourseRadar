import React, { Component } from "react"
import CourseCard from "../general/CourseCard"
import "./SearchResultPage.css"
import {Checkbox} from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ServerConfig from "../config/ServerConfig";
import {withRouter} from 'react-router-dom'
import SideHoverButtons from "../general/SideHoveringButtons"
class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        this.FILTER_ITEMS = [
            {type: "creditType", value: "C"},
            {type: "creditType", value: "DIV"},
            {type: "creditType", value: "I&S"},
            {type: "creditType", value: "N/A"},
            {type: "creditType", value: "NW"},
            {type: "creditType", value: "QSR"},
            {type: "creditType", value: "VLPA"},
        ];
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
            checkedState: new Array(this.FILTER_ITEMS.length).fill(false)

        }
    }

    

    componentDidMount() {
        let curFilters = this.props.history.location.state;
        let curCourseName = curFilters[0];
        let curLevel = curFilters[1];
        let curCredit = curFilters[2];
        let curCreditType = curFilters[3];
        if ((curCourseName !== "") 
            || (curLevel !== "")
            || (curCredit !== "")
            || (curCreditType !== "")) {
            this.processSearchResult(curCourseName, curLevel, curCredit, curCreditType);
        } else {
            this.setState({loaded: true});
        }
    }

    componentDidUpdate(props) {
        // let curFilters = this.props.history.location.state;
        // let curCourseName = curFilters[0];
        // let curLevel = curFilters[1];
        // let curCredit = curFilters[2];
        // let curCreditType = curFilters[3];
        let curFilters = props.filter;
        let curCourseName = curFilters.courseName;
        let curLevel = curFilters.level === -1 ? "" : curFilters.level.toString();
        let curCredit = curFilters.credit === -1 ? "" : curFilters.credit.toString();
        let curCreditType = curFilters.creditType;
        curCreditType = curCreditType.join("/");
        if (
            curFilters && (
                curCourseName !== this.state.courseName ||
                curLevel !== this.state.courseLevel ||
                curCredit !== this.state.courseCredit ||
                curCreditType !== this.state.courseCreditType
            )
        ) {
            if (curCourseName !== "" || curLevel !== "" || curCredit !== "" || curCreditType !== "") {
                if (this.state.loaded) {
                    console.log(curCourseName);
                    this.processSearchResult(curCourseName, curLevel, curCredit, curCreditType);
                }
            }
        }
    }


    // fetch data
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
        if (curCourseName !== "") {
            if (currentUrl === url) {
                currentUrl += "?";
            }
            currentUrl += "courseName=" + curCourseName;
        }
        // check level
        if (curLevel !== "") {
            if (currentUrl === url) {
                currentUrl += "?level=" + curLevel;
            } else {
                currentUrl += "&level=" + curLevel;
            }
        }
        // check credit
        if (curCredit !== "") {
            if (currentUrl === url) {
                currentUrl += "?credit=" + curCredit;
            } else {
                currentUrl += "&credit=" + curCredit;
            }
        }
        // check creditType
        if (curCreditType !== "") {
            if (currentUrl === url) {
                currentUrl += "?creditType=" + curCreditType;
            } else {
                currentUrl += "&creditType=" + curCreditType;
            }
        }

        fetch(currentUrl)
            .then(checkStatus)
            .then(res => {
                let courses = res.result;
                let courseTemp = [];
                for (let i = 0; i < courses.length; i++) {
                    let course = courses[i];
                    let curCreditType = course.creditType;
                    let curTag = null;
                    if (curCreditType !== null) {
                        curTag = curCreditType.split("/");
                    }
                    courseTemp.push({
                        courseName: course.courseName,
                        courseDescription: course.courseFullName,
                        tags: curTag,
                        credit: course.credit[0]
                    })
                }
                this.setState({
                    courseCards: courseTemp,
                    loaded: true
                })
            }).then(() => {
                this.props.updateFilter({
                    courseName: this.state.courseName,
                    creditType:[],
                    credit: -1,
                    level: -1
                })
            })
            .catch(this.setState({courseCards: []}));
    }

    handleOnChangeClick(position) {
        const updatedChecked = this.state.checkedState.map((item, index) =>{            
            return index === position ? !item : item;       
        });

        this.setState({
            checkedState: updatedChecked
        })

        let tempFilter = this.props.filter;
        tempFilter.creditType = [];
        for (let i = 0; i < updatedChecked.length; i++) {
            if (updatedChecked[i]) {
                let key = this.FILTER_ITEMS[i].type;
                tempFilter[key].push(this.FILTER_ITEMS[i].value);
            }
        }

    }

    generateCheckboxArr = () => {
        const result = [];
        for (let i = 0; i < this.FILTER_ITEMS.length; i++) {
            result.push(
                <div className="single-filter-item">
                    <Checkbox
                        checked={this.state.checkedState[i]}
                        onChange={() => this.handleOnChangeClick(i)}
                        className="checkbox"
                    />
                    <label> {this.FILTER_ITEMS[i].value} </label>
                </div>
            )
        }
        return result;
    }

    render() {

        const LEVELS = ["100", "200", "300", "400"];
        const CREDITS = ["1", "2", "3", "4", "5"];
        const CREDIT_TYPES = ["C", "DIV", "I&S", "None", "NW", "QSR", "VLPA"];

        const onChangeLevel = (event) => {
            this.setState({ selectLevel: event.target.value });
            let tempFilter = this.props.filter;
            tempFilter.level = event.target.value;
            this.props.updateFilter(tempFilter);
            setSubCourseCards();
        }

        const onChangeCredit = (event) => {
            this.setState({ selectCredit: event.target.value });
            let tempFilter = this.props.filter;
            tempFilter.credit = event.target.value;
            this.props.updateFilter(tempFilter);
            setSubCourseCards();
        }

        const onChangeCreditType = (event) => {
            this.setState({ selectCreditType: event.target.value });
            let tempFilter = this.props.filter;
            // TODO there is a bug
            tempFilter.creditType = event.target.value;
            this.props.updateFilter(tempFilter);
            setSubCourseCards();
        }

        const setSubCourseCards = () => {
            let tempSubCourseCards = [];
            let courseCards = this.state.courseCards;
            let fitLevel = false;
            let fitCredit = false;
            let fitCreditType = false;
            if (this.state.selectLevel === "") {
                fitLevel = true;
            }
            if (this.state.selectCredit === "") {
                fitCredit = true;
            }
            if (this.state.selectCreditType === "") {
                fitCreditType = true;
            }
            for (let i = 0; i < courseCards.length; i++) {
                if (this.state.selectLevel !== "") {
                    fitLevel = false;
                    let tempCourseNum = parseInt(courseCards[i].courseName.match(/\d+/g));
                    let tempLevel = parseInt(this.state.selectLevel);
                    let difference = tempCourseNum - tempLevel;
                    if (difference >= 0 && difference < 100) {
                        fitLevel = true;
                    }
                }
                if (this.state.selectCredit !== "") {
                    fitCredit = false;
                    if (courseCards[i].credit === this.state.selectCredit - 0) {
                        fitCredit = true;
                    }
                }
                if (this.state.selectCreditType !== "") {
                    fitCreditType = false;
                    if (courseCards[i].tags === null) {
                        if (this.state.selectCreditType === null) {
                            fitCreditType = true;
                        }
                    } else if (courseCards[i].tags.includes(this.state.selectCreditType)) {
                        fitCreditType = true;
                    }
                }
                if (fitLevel && fitCredit && fitCreditType) {
                    tempSubCourseCards.push(courseCards[i]);
                }
            }
            // this.setState({subCourseCards: tempSubCourseCards});

            if (tempSubCourseCards.length === 0) {
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
                <SideHoverButtons />
                <div className="filter">
                    <h1>二次筛选</h1>
                    <h2>课程级别</h2>
                    <RadioGroup value={this.state.courseLevel} onChange={onChangeLevel}>
                        {/* { (this.state.courseLevel === "") ? LEVELS.map((input) => {
                            return (<FormControlLabel value={input} control={<Radio />} label={input} />);
                        }) : this.state.courseLevel.split("/").map((input) => {
                            return (<FormControlLabel value={input} control={<Radio />} label={input} />);
                        })} */}
                        <FormControlLabel value="100" control={<Radio />} label="100" />
                        <FormControlLabel value="200" control={<Radio />} label="200" />
                        <FormControlLabel value="300" control={<Radio />} label="300" />
                        <FormControlLabel value="400" control={<Radio />} label="400" />
                        <FormControlLabel value="" control={<Radio />} label="all levels" />
                    </RadioGroup>
                    <h2>学分</h2>
                    <RadioGroup value={this.state.courseCredit} onChange={onChangeCredit}>
                        {/* { (this.state.courseCredit === "") ? CREDITS.map((input) => {
                            return (<FormControlLabel value={input} control={<Radio />} label={input} />);
                        }) : this.state.courseCredit.split("/").map((input) => {
                            return (<FormControlLabel value={input} control={<Radio />} label={input} />);
                        })} */}
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                        <FormControlLabel value="" control={<Radio />} label="all credits" />
                    </RadioGroup>
                    <h2>课程类型</h2>
                    {this.generateCheckboxArr()}
                </div>
                <div className="course-list2">
                    {!this.state.loaded &&
                        <div class="loading-small">
                                <img class = 'loading' src="../img/loading.gif" alt="Logo for loading" />
                        </div>
                    }
                    {this.state.loaded && setSubCourseCards()}
                    {/* <i aria-hidden="true"></i>
                    <i aria-hidden="true"></i>
                    <i aria-hidden="true"></i>
                    <i aria-hidden="true"></i> */}
                </div>
            </div>
        )
    }
}

export default withRouter(SearchResultPage);

function checkStatus(response) {
    if (response.ok) {
        if (response.status == 200) {
            return response.json()
        } else {
            return {result: []};
        }

    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText))
    }
}