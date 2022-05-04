import React, {useEffect, useRef, useState} from "react"
import "./SearchResultPage.css"

import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import {Link, useLocation} from "react-router-dom";
import {Button, CircularProgress, MenuItem} from "@material-ui/core";
import ServerConfig from "../config/ServerConfig";
import CourseCard from "../general/CourseCard";
import Menu from "@material-ui/core/Menu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Redux
import {useDispatch, useSelector} from 'react-redux'
import {setCourseLevel, setCourseName, setCourseType, setCreditNumber} from './controller/SearchQuerySlice'

// Original search URL: https://uwclassmate.com/search (this URL will not change regardless users' state, and users will see blank page just opening the URL)
// Proposed router URL: https://uwclassmate.com/search/cse142?course_level=all&credit_number=1.4&course_type=DIV.IS
// Also, I decide to use the modern function declaration instead of "old-fashioned?" class component as I expect to have a major re-write this SearchResultPage component

// Global Functions
const LEVELS = ["100", "200", "300", "400", "500"];
const CREDITS = ["1", "2", "3", "4", "5", "5+"];
// Took out None, since it's also a utility value (should be mutually exclusive selection)
const CREDIT_TYPES = ["C", "DIV", "I&S", "NW", "QSR", "VLPA", "W"];
const SORT_BY = ["prefix", "number", "title", "credit"];

function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResultPage(props) {
    // Read Redux States
    const courseName = useSelector(state => state.search.courseName);
    const courseLevel = useSelector(state => state.search.courseLevel);
    const creditNumber = useSelector(state => state.search.creditNumber);
    const courseType = useSelector(state => state.search.courseType);
    const dispatch = useDispatch();

    // Extract course name from URL
    const pathName = window.location.pathname; // anything right before ? mark
    const pathNameArr = pathName.split('/');
    // alert(pathNameArr.at(-1));
    if(pathNameArr.at(-1) !== "search") { // Otherwise, default "all" state is used if nothing comes after search
        dispatch(setCourseName(pathNameArr.at(-1)));
    }

    // Extract course searched from url parameter
    const params = (new URL(window.location)).searchParams;
    const levelArr = extractParam(params, "course_level", LEVELS);
    if(!arrayEquals(levelArr, courseLevel)) {
        dispatch(setCourseLevel(levelArr));
    }
    const creditArr = extractParam(params, "credit_number", CREDITS);
    if(!arrayEquals(creditArr, creditNumber)) {
        dispatch(setCreditNumber(creditArr));
    }
    const courseTypeArr = extractParam(params, "course_type", CREDIT_TYPES, ["IS", "None"]);
    if(!arrayEquals(courseTypeArr, courseType)) {
        dispatch(setCourseType(courseTypeArr));
    }

    let orderByValue = params.get("order_by");
    if(orderByValue === undefined || !SORT_BY.includes(orderByValue)) {orderByValue = "prefix";}

    // This function will extract course level, credit number, and credit type parameter's value (as function's return)
    // Default to all if it does not exist or contains unacceptable values
    function extractParam(queryObj, queryName, referenceConst, extraAllowedValue = []) {
        let result;
        if (queryObj.get(queryName) === null) {
            result = ["all"];
        } else {
            result = queryObj.get(queryName).split(".");
            if (result.includes("all")) {
                result = ["all"]
            } else if (!result.every(r => referenceConst.concat(["all"].concat(extraAllowedValue)).includes(r))) {
                result = ["all"]; // default to all for malformed query
            }
        }
        return result;
    }

    // This function that will check whether two arrays is equal, return boolean value
    // It is useful for me to dispatch state update only if new state differs from old state
    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    const [isParamValid, setIsParamValid] = useState(false); // TODO: Add a non-critical warning banner/pop-up in search result stating that which parameter has invalid value and hence being ignored (instead of throw out an error screen)
    const [loaded, setLoaded] = useState(true);
    const [isCourseDNE, setIsCourseDNE] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [courseCards, setCourseCards] = useState([]);
    const [favCourses, setFavCourses] = useState([]);
    const [favLoaded, setFavLoaded] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(true);
    const [orderBy, setOrderBy] = useState(orderByValue);
    const [isDesc, setIsDesc] = useState(params.get("is_desc") === "true"); // All other values will be cast to false
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [orderByBtnEl, setOrderByBtnEl] = useState(null);

    // console.log(favCourses);
    // favorite course state
    // const [favCourses, setFavCourses] = useState([]);

    async function getFavorite() {
        fetch(ServerConfig.SERVER_URL + "/api/isFavorite", {
            body: JSON.stringify({

                // courseName: name.toLowerCase()
            }),
            credentials: "include",
            method: "POST"
        }).then(res => {
            if(res.ok) {
                return res.json();
            } else {
                console.log(res);
            }
        }).then(data => {
            console.log(data);
            if (data && data["state"] === 1) {
                let favoriteCourseName = [];
                data["data"].forEach(function (currentValue) {favoriteCourseName.push(currentValue["courseName"])});
                // return favoriteCourseName;
                setFavCourses(favoriteCourseName);
                // console.log(favCourses);
            }
            setFavLoaded(true);
        })
    }

    async function getUserInfo() {
        fetch(ServerConfig.SERVER_URL + "/api/userinfo", {
            credentials: "include"
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else if (response.status == 403) {
                throw new Error("unauthorized")
            }
        }).then(data => {
            if (data) {
                setRedirectToLogin(false);
            }
        }).catch(() => {
            setRedirectToLogin(true);
        })
    }

    function handleURLParam(param, newVal) {
        let url = new URL(document.URL);
        let params = new URLSearchParams(url.search);
        params.set(param, newVal);
        window.history.pushState(null, null, '?' + params.toString());
    }

    // Custom data cleaning function to account for mutually exclusive selection
    function handleFilterChange(destination, newValue) {
        //console.log("handleFilterChange(" + destination + ", " + newValue);
        let url = new URL(document.URL);
        let params = new URLSearchParams(url.search);
        if (destination === "courseLevel") {
            // ES6 way to copy/clone an array
            let newCourseLevel = [...courseLevel];

            // Toggling between all and not all
            if (newValue === "all" && courseLevel.indexOf("all") < 0) {
                newCourseLevel = ["all"];
            } else if (courseLevel[0] === "all" && newValue !== "all") {
                newCourseLevel = [newValue];
            }
            // When it's not all, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && courseLevel.indexOf(newValue) >= 0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedLevel = newCourseLevel.filter(e => e !== newValue);
                if (updatedLevel[0] === "" || updatedLevel.length === 0) {
                    newCourseLevel = ["all"];
                } else {
                    newCourseLevel = updatedLevel;
                }
            } else if (newValue !== "all" && courseLevel.indexOf(newValue) < 0) {
                // Non Mutative way to concat an array
                newCourseLevel = courseLevel.concat(newValue);
            }

            params.set('course_level', newCourseLevel.join("."));
            window.history.pushState(null, null, '?' + params.toString());

            dispatch(setCourseLevel(newCourseLevel));
        } else if (destination === "creditNumber") {
            // ES6 way to copy/clone an array
            let newCreditNumber = [...creditNumber];

            // Toggling between all and not all
            if (newValue === "all" && creditNumber.indexOf("all") < 0) {
                newCreditNumber = ["all"];
            } else if (creditNumber[0] === "all" && newValue !== "all") {
                newCreditNumber = [newValue];
            }
            // When it's not all, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && creditNumber.indexOf(newValue) >= 0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedCreditNumber = newCreditNumber.filter(e => e !== newValue);
                if (updatedCreditNumber[0] === "" || updatedCreditNumber.length === 0) {
                    newCreditNumber = ["all"];
                } else {
                    newCreditNumber = updatedCreditNumber;
                }
            } else if (newValue !== "all" && creditNumber.indexOf(newValue) < 0) {
                // Non Mutative way to concat an array
                newCreditNumber = creditNumber.concat(newValue);
            }

            params.set('credit_number', newCreditNumber.join("."));
            window.history.pushState(null, null, '?' + params.toString());

            dispatch(setCreditNumber(newCreditNumber));
        } else if (destination === "courseType") {
            // ES6 way to copy/clone an array
            let newCourseType = [...courseType];

            // Toggling between all and not all
            if (newValue === "all" && courseType.indexOf("all") < 0) {
                newCourseType = ["all"];
            } else if (courseType[0] === "all" && newValue !== "all" && newValue !== "None") {
                newCourseType = [newValue];
            }
            // Toggle between None and not None
            else if (newValue === "None" && courseType.indexOf("None") < 0) {
                newCourseType = ["None"];
            } else if (courseType[0] === "None" && newValue !== "all" && newValue !== "None") {
                newCourseType = [newValue];
            }
            // When it's not all and not none, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && newValue !== "None" && courseType.indexOf(newValue) >= 0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedCourseType = newCourseType.filter(e => e !== newValue);
                if (updatedCourseType[0] === "" || updatedCourseType.length === 0) {
                    newCourseType = ["all"];
                } else {
                    newCourseType = updatedCourseType;
                }
            } else if (newValue !== "all" && newValue !== "None" && courseType.indexOf(newValue) < 0) {
                // Non-Mutative way to concat an array
                newCourseType = courseType.concat(newValue);
            }
            params.set('course_type', newCourseType.join("."));
            window.history.pushState(null, null, '?' + params.toString());

            dispatch(setCourseType(newCourseType));
        }
    }

    useEffect(() => {
        getFavorite();
    }, [courseName, courseLevel, creditNumber, courseType]);

    useEffect(() => {
        getUserInfo();
    })

    useEffect(() => {
        // const getFavCourses = new Promise(async (resolve, reject) => {
        //     console.log(222);
        //     setTimeout(() => {
        //         let favCourses = getFavorite();
        //         resolve(["cse142"]);
        //     }, 250);

        //     reject(console.log(111));
        // })
        // let favCourses = getFavorite();
        // getFavCourses.then((favCourses) => {
        fetchCourse(courseName, courseLevel, creditNumber, courseType, orderBy, isDesc,  courseCards, favCourses, redirectToLogin, setCourseCards, setLoaded, setIsCourseDNE, setErrorMessage);
        // })
    }, [courseName, courseLevel, creditNumber, courseType, favCourses, redirectToLogin, orderBy, isDesc]);

    function resetFilter(event) {event.preventDefault(); handleFilterChange("courseLevel", "all"); handleFilterChange("creditNumber", "all"); handleFilterChange("courseType", "all");}

    const sort = {prefix: "课程前缀", number: "课程序号", title: "课程名称", credit: "学分数量"}; // English to Chinese dictionary
    if(!loaded) {
        return(
            <div className="search-result">
                <SearchFilter courseLevel={courseLevel} creditNumber={creditNumber} courseType={courseType}
                              handleFilterChange={handleFilterChange}/>
                <div className="course-list2">
                    <LoadingScreen/>
                </div>
            </div>
        )
    }
    else if (isCourseDNE || errorMessage) {
        return(<div className="search-result">
            <SearchFilter courseLevel={courseLevel} creditNumber={creditNumber} courseType={courseType}
                          handleFilterChange={handleFilterChange}/>
            <div className="course-list2">
                <ErrorScreen courseName = {courseName} courseLevel = {courseLevel} creditNumber = {creditNumber} courseType = {courseType} resetFilter={resetFilter} errorMessage = {isCourseDNE ? "Course Not Exist" : errorMessage}/>
            </div>
        </div>)
    }
    else {
        return (
            <div className="search-result">
                <SearchFilter courseLevel={courseLevel} creditNumber={creditNumber} courseType={courseType} handleFilterChange={handleFilterChange}/>
                <div className="course-list2">
                    <div className="sort_result_bar">
                        <Button className="sort_button" color="secondary" disableElevation endIcon={<KeyboardArrowDownIcon />} variant="contained" onClick={(event)=>{setIsSortMenuOpen(!isSortMenuOpen); setOrderByBtnEl(event.currentTarget)}}>按{sort[orderBy]}排序</Button>
                        <Menu dense open={isSortMenuOpen} anchorEl={orderByBtnEl}>
                            {Object.keys(sort).map(oneKey => {return <MenuItem key={oneKey} selected={orderBy === oneKey} onClick={()=>{setIsSortMenuOpen(false); setOrderBy(oneKey); handleURLParam("order_by", oneKey)}}>{sort[oneKey]}</MenuItem>})}
                        </Menu>
                        <div>
                            <FormControlLabel className="sort_desc_toggle" onChange={()=>{handleURLParam("is_desc", !isDesc);setIsDesc(!isDesc)}} control={<Checkbox checked={isDesc} />} label="降序排序" />
                        </div>
                    </div>
                    <SearchResult courseCards={courseCards}/>
                </div>
            </div>
        );
    }
}

function SearchFilter(props) {
    return (
        <div className="filter">
            <h1>二次筛选</h1>
            {/*<h2>课程级别</h2>*/}
            <FormLabel component="legend">课程级数</FormLabel>
            <FormControlLabel control={<Radio checked={props.courseLevel.indexOf("all") >= 0} onChange={() => {
                props.handleFilterChange("courseLevel", "all")
            }}/>} label="全部"/>
            {LEVELS.map((input) => {
                return (<div key={input}>
                    <FormControlLabel control={<Checkbox checked={props.courseLevel.indexOf(input) >= 0}
                                                         onChange={() => {
                                                             props.handleFilterChange("courseLevel", input)
                                                         }}/>}
                                      label={input}/>
                </div>);
            })}
            <FormLabel component="legend">学分数量</FormLabel>
            <FormControlLabel control={<Radio checked={props.creditNumber.indexOf("all") >= 0} onChange={() => {
                props.handleFilterChange("creditNumber", "all")
            }}/>} label="全部"/>
            {CREDITS.map((input) => {
                return (<div key={input}>
                    <FormControlLabel control={<Checkbox checked={props.creditNumber.indexOf(input) >= 0}
                                                         onChange={() => {
                                                             props.handleFilterChange("creditNumber", input)
                                                         }}/>}
                                      label={input}/>
                </div>);
            })}
            <FormLabel component="legend">通识类别</FormLabel>
            <FormControlLabel control={<Radio checked={props.courseType.indexOf("all") >= 0} onChange={() => {
                props.handleFilterChange("courseType", "all")
            }}/>} label="全部"/>
            {CREDIT_TYPES.map((input) => {
                if (input !== "None") {
                    return (
                        <div key={input}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={props.courseType.indexOf(input === "I&S" ? "IS" : input) >= 0}
                                    onChange={() => {
                                        props.handleFilterChange("courseType", input === "I&S" ? "IS" : input)
                                    }}/>}
                                label={input}/>
                        </div>);
                }
            })}
            <FormControlLabel control={<Radio checked={props.courseType.indexOf("None") >= 0} onChange={() => {
                props.handleFilterChange("courseType", "None")
            }}/>} label="无通识学分"/>
        </div>
    )
}

function LoadingScreen(props) {
    return (
        <div className='loading_container'>
            {/*<img className='loading' src="../img/loading.gif" alt="Logo for loading"/>*/}
            <CircularProgress color="secondary" size="75px"/>
            <span className='loading_text'>正在查询，请稍候...</span>
        </div>
    )
}

function ErrorScreen(props) {
    if(props.errorMessage === "Course Not Exist") {
        if(![props.courseLevel, props.creditNumber, props.courseType].every(arr => {return arr.length === 1 && arr[0] === "all"})) {
            return (
                <div className='loading_container'>
                    <img className='loading' src="../img/Course-DNE.png"/>
                    <div className='loading_text'>很抱歉，我们找不到满足这些筛选条件的课程，建议您<span style={{cursor: 'pointer', color: 'purple'}} onClick={props.resetFilter}>扩大筛选条件</span></div>
                </div>
            )
        }
        return (
            <div className='loading_container'>
                <img className='loading' src="../img/Course-DNE.png"/>
                <div className='loading_text'>很抱歉，我们找不到课程：{props.courseName}，可能我们网站并没有此课程的课评</div>
                <div className='loading_text'>如果你上过这节课，欢迎<Link to={"/survey/?course=" + props.courseName} style={{color: 'purple'}} activeStyle={{color: 'purple'}}>填写课评</Link></div>
            </div>
        )
    }
    return (
            <div className='loading_container'>
                <img className='loading' src="../img/Course-DNE.png"/>
                <div className='loading_text'>出错啦，请稍候重试。以下是为我们社团成员准备的调试信息</div>
                <div className='loading_text'><div className='error_stack_trace'>{props.errorMessage}</div></div>
            </div>
    )
}

// function for add favorite courses


function SearchResult(props) {
    // console.log(props);
    return (
        <div className="course-list2">
            {props.courseCards.map(element => (
                <CourseCard
                    key={element.courseName}
                    courseName={element.courseName}
                    courseDescription={element.courseDescription}
                    tags={element.tags}
                    credit={element.credit}
                    loginStatus={!element.redirectToLogin}
                    isFavorite={element.isFavorite}/>
            ))}
        </div>
        )
}

async function fetchCourse(courseName= "all", courseLevel = ['all'], creditNumber = ['all'], courseType = ['all'], orderBy = "title", isDesc = false, courseCards, favCourses, redirectToLogin, setCourseCardsCallBackFn, setLoadedCallBackFn, setIsCourseDNECallBackFn, setErrorMessageCallBackFn) {
    // Only show loading screen if the course list is previously empty
    console.log(favCourses);
    if(courseCards === undefined || courseCards.length === 0) {
        setLoadedCallBackFn(false);
    }

    // Example backend search query:
    // You may assume that courseName, courseLevel, creditNumber, courseType are not null
    // You may assume that no value will be repeated in a query, but (for query that can have multiple values) you may NOT assume that values are in sorted order. Hence, courseLevel=400.100.200.300 is a valid back-end query.
    // https://uwclassmate.com/api/search?courseName=cse142&courseLevel=all&creditNumber=1.4&courseType=DIV.IS

    let paramsObj = {courseName: courseName, level: courseLevel.join('.'), credit: creditNumber.join('.'), creditType: courseType.join('.'), orderBy: orderBy, isDesc: isDesc.toString()};
    let searchParams = new URLSearchParams(paramsObj);

    searchParams.toString();
    const currentUrl = ServerConfig.SERVER_URL + "/api/search?" + searchParams.toString();

    // Re-write this fetch code using async await
    try {
        // Display loading screen only if we don't have any course card displays previously
        if(courseCards.length === 0) {
            setLoadedCallBackFn(false);
        }
        setIsCourseDNECallBackFn(false);
        setErrorMessageCallBackFn(false);
        const results = await fetch(currentUrl);
        // console.log(currentUrl);
        if(results.status === 204) {
            setLoadedCallBackFn(true);
            setCourseCardsCallBackFn([]);
            setIsCourseDNECallBackFn(true);
        } else if(results.status === 200) {
            // const resultJSON = await results.json();
            let jsonParsing = await results.json();
            let courses = jsonParsing.result;
            let courseTemp = [];
            for (let i = 0; i < courses.length; i++) {
                let course = courses[i];
                let curCreditType = course.creditType;
                let curTag = null;
                if (curCreditType !== null) {
                    curTag = curCreditType.split("/");
                }
                console.log(favCourses.includes(course.courseName));
                courseTemp.push({
                    courseName: course.courseName,
                    courseDescription: course.courseFullName,
                    tags: curTag,
                    credit: course.credit[0],
                    redirectToLogin: redirectToLogin,
                    isFavorite: favCourses.includes(course.courseName)
                });
            }
            setIsCourseDNECallBackFn(false);
            setErrorMessageCallBackFn(false);
            setCourseCardsCallBackFn(courseTemp);
            setLoadedCallBackFn(true);
        }
    } catch (err) {
        setLoadedCallBackFn(true);
        setErrorMessageCallBackFn(true);
        setCourseCardsCallBackFn([]);
        // Print out stack trace of this error on this webpage
        setErrorMessageCallBackFn(err.stack);
    }
}
