import React, {Component, useState} from "react"
import CourseCard from "../general/CourseCard"
import "./SearchResultPage.css"

import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ServerConfig from "../config/ServerConfig";
import {useLocation, useParams} from "react-router-dom";

// Proposed router URL: /search/cse142?course_level=100,200&credit_number=1,2&course_type=C,DIV
// Also, I decide to use the modern function declaration instead of "old-fashioned?" class component as I expect to have a major re-write this SearchResultPage component

// Global Functions
const LEVELS = ["100", "200", "300", "400", "500"];
const CREDITS = ["1", "2", "3", "4", "5"];
// Took out None, since it"s also a utility value (should be mutually exclusive selection)
const CREDIT_TYPES = ["C", "DIV", "I&S", "NW", "QSR", "VLPA", "W"];

function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResultPage(props) {
    // Fetch URL parameter
    let query = useQuery();

    // Extract course searched from url
    let courseName_init = useParams()["courseName"];

    // Extract course_level query parameter
    let courseLevel_init;
    if (query.get("course_level") === null) {
        courseLevel_init = ["all"];
    } else {
        courseLevel_init = query.get("course_level").split(",");
        if (courseLevel_init.includes("all")) {
            courseLevel_init = ["all"]
        }
    }

    // Extract credit_number query parameter
    let creditNumber_init;
    if (query.get("credit_number") === null) {
        creditNumber_init = ["all"];
    } else {
        creditNumber_init = query.get("credit_number").split(",");
        if (creditNumber_init.includes("all")) {
            creditNumber_init = ["all"]
        }
    }

    // Extract credit_type query parameter
    let courseType_init;
    if (query.get("course_type") === null) {
        courseType_init = ["all"];
    } else {
        courseType_init = query.get("course_type").split(",");
        if (courseType_init.includes("all")) {
            courseType_init = ["all"]
        }
    }

    // Note: need to extract parameter first before I can able to set states
    const [courseName, setCourseName] = useState(courseName_init);
    const [courseLevel, setCourseLevel] = useState(courseLevel_init);
    const [creditNumber, setCreditNumber] = useState(creditNumber_init);
    const [courseType, setCourseType] = useState(courseType_init);
    const [loaded, setLoaded] = useState(false);
    const [courseCards, setCourseCards] = useState([]);

    // Custom data cleaning function to account for mutually exclusive selection
    function handleFilterChange(destination, newValue) {
        console.log("handleFilterChange(" + destination + ", " + newValue);
        if(destination === "courseLevel") {
            // Toggling between all and not all
            if(newValue==="all" && courseLevel.indexOf("all")<=0) {
                setCourseLevel(["all"]);
            } else if (courseLevel === ["all"] && newValue !== "all") {
                setCourseLevel([newValue]);
            }
            // When it's not all, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && courseLevel.indexOf(newValue)>=0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedLevel = courseLevel.filter(e => e !== newValue);
                if(updatedLevel.size === 0) {
                    setCourseLevel(["all"]);
                } else {
                    setCourseLevel(updatedLevel);
                }
            }
            else if (newValue !== "all" && courseLevel.indexOf(newValue)<0) {
                // Non Mutative way to concat an array
                setCourseLevel(courseLevel.concat(newValue));
            }
        } else if(destination === "creditNumber") {
            // Toggling between all and not all
            if(newValue==="all" && creditNumber.indexOf("all")<=0) {
                setCreditNumber(["all"]);
            } else if (creditNumber === ["all"] && newValue !== "all") {
                setCreditNumber([newValue]);
            }
            // When it's not all, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && creditNumber.indexOf(newValue)>=0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedLevel = creditNumber.filter(e => e !== newValue);
                if(updatedLevel.size === 0) {
                    setCreditNumber(["all"]);
                } else {
                    setCreditNumber(updatedLevel);
                }
            }
            else if (newValue !== "all" && creditNumber.indexOf(newValue)<0) {
                // Non Mutative way to concat an array
                setCreditNumber(creditNumber.concat(newValue));
            }
        } else if(destination === "courseType") {
            // Toggling between all and not all
            if(newValue==="all" && creditNumber.indexOf("all")<=0) {
                setCourseType(["all"]);
            } else if (creditNumber === ["all"] && newValue !== "all") {
                setCourseType([newValue]);
            }
            // Toggle between None and not None
            else if(newValue==="None" && creditNumber.indexOf("None")<=0) {
                setCourseType(["None"]);
            } else if (creditNumber === ["None"] && newValue !== "None") {
                setCourseType([newValue]);
            }
            // When it's not all and not none, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && newValue !== "None" && creditNumber.indexOf(newValue)>=0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedLevel = creditNumber.filter(e => e !== newValue);
                if(updatedLevel.size === 0) {
                    setCourseType(["all"]);
                } else {
                    setCourseType(updatedLevel);
                }
            } else if (newValue !== "all" && newValue !== "None" && creditNumber.indexOf(newValue)<0) {
                // Non Mutative way to concat an array
                setCourseType(creditNumber.concat(newValue));
            }
        }
    }

    // Confirmed that parameters are passed as array;
    // console.log("Search Query: course searched: " + courseName.toString() + " course level: " + courseLevel.toString() + " credit number: " + creditNumber.toString() + " course type: " + courseType.toString());

    return (
        <div className="search-result">
            <SearchFilter courseLevel={courseLevel} creditNumber={creditNumber} courseType={courseType} handleFilterChange={handleFilterChange}/>
            <div className="course-list2">
            </div>
        </div>
    );
}

function SearchFilter(props) {
    return (
        <div className="filter">
            <h1>二次筛选</h1>
            {/*<h2>课程级别</h2>*/}
            <FormLabel component="legend">课程级数</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={props.courseLevel.indexOf("all") >= 0 ? "all" : ""}
                onChange={(value)=>props.handleFilterChange("courseLevel", value)}
            >
                <FormControlLabel value="all" control={<Radio/>} label="全部"/>
                {LEVELS.map((input) => {
                    return (<FormControlLabel
                        control={<Checkbox checked={props.courseLevel.indexOf(input) >= 0} onChange={()=>{props.handleFilterChange("courseLevel", input)}}/>}
                        label={input}/>);
                })}
            </RadioGroup>
            <FormLabel component="legend">学分数量</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={props.creditNumber.indexOf("all") >= 0 ? "all" : ""}
                onChange={(value)=>props.handleFilterChange("creditNumber", value)}
            >
                <FormControlLabel value="all" control={<Radio/>} label="全部"/>
                {CREDITS.map((input) => {
                    return (<FormControlLabel
                        control={<Checkbox checked={props.creditNumber.indexOf(input) >= 0} onChange={()=>{props.handleFilterChange("creditNumber", input)}}/>}
                        label={input}/>);
                })}
            </RadioGroup>
            <FormLabel component="legend">通识类别</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={props.courseType.indexOf("all") >= 0 ? "all" : ""}
                onChange={(value)=>{console.log(value);props.handleFilterChange("courseType", value)}}
            >
                <FormControlLabel value="all" control={<Radio/>} label="全部"/>
                {CREDIT_TYPES.map((input) => {
                    if(input!=="None") {
                        return (<FormControlLabel
                            control={<Checkbox checked={props.courseType.indexOf(input === "I&S" ? "IS" : input) >= 0} onChange={()=>{props.handleFilterChange("courseType", input === "I&S" ? "IS" : input)}}/>}
                            label={input}/>);
                    }
                })}
                <FormControlLabel value="None" control={<Radio/>} label="无通识学分"/>
            </RadioGroup>
        </div>
    )
}