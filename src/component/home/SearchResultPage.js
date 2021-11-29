import React, {Component, useState} from "react"
import CourseCard from "../general/CourseCard"
import "./SearchResultPage.css"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ServerConfig from "../config/ServerConfig";
import {useLocation, useParams} from "react-router-dom";

// Proposed router URL: /search/cse142?course_level=100,200&credit_number=1,2&course_type=C,DIV
// Also, I decide to use the modern function declaration instead of "old-fashioned?" class component as I expect to have a major re-write this SearchResultPage component

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function SearchResultPage(props) {
    // Fetch URL parameter
    let query = useQuery();

    // Extract course searched from url
    let courseName_init = useParams()["courseName"];

    // Extract course_level query parameter
    let courseLevel_init;
    if(query.get("course_level") === null) {
        courseLevel_init = ['all'];
    } else {
        courseLevel_init = query.get("course_level").split(',');
        if(courseLevel_init.includes('all')) {courseLevel_init = ['all']};
    }

    // Extract credit_number query parameter
    let creditNumber_init;
    if(query.get("credit_number") === null) {
        creditNumber_init = ['all'];
    } else {
        creditNumber_init = query.get("credit_number").split(',');
        if(creditNumber_init.includes('all')) {creditNumber_init = ['all']};
    }

    // Extract credit_type query parameter
    let courseType_init;
    if(query.get("course_type") === null) {
        courseType_init = ['all'];
    } else {
        courseType_init = query.get("course_type").split(',');
        if(courseType_init.includes('all')) {courseType_init = ['all']};
    }

    // Note: need to extract parameter first before I can able to set states
    const [courseName, setCourseName] = useState(courseName_init);
    const [courseLevel, setCourseLevel] = useState(courseLevel_init);
    const [creditNumber, setCreditNumber] = useState(creditNumber_init);
    const [courseType, setCourseType] = useState(courseType_init);
    const [loaded, setLoaded] = useState(false);
    const [courseCards, setCourseCards] = useState([]);

    // Confirmed that parameters are passed as array;
    console.log("Search Query: course searched: " + courseName.toString() + " course level: " + courseLevel.toString() + " credit number: " + creditNumber.toString() + " course type: " + courseType.toString());

    return (
        <div className="search-result">
            <SearchFilter courseName={courseName} setCourseName={setCourseName} courseLevel={courseLevel} setCourseLevel={setCourseLevel} creditNumber={creditNumber} setCreditNumber={setCreditNumber} courseType={courseType} setCourseType={setCourseType}/>
            <div className="course-list2">
            </div>
        </div>
    );
}

function SearchFilter(props) {
    const LEVELS = ["100", "200", "300", "400", "500", "all"];
    const CREDITS = ["1", "2", "3", "4", "5", "all"];
    const CREDIT_TYPES = ["C", "DIV", "I&S", "None", "NW", "QSR", "VLPA", "all"];
    return(
        <div className="filter">
            <h1>二次筛选</h1>
            <h2>课程级别</h2>
            <RadioGroup value={props.courseLevel} onChange={props.setCourseLevel}>
                {LEVELS.map((input) => {
                    return (<FormControlLabel value={input} control={<Radio/>} label={input}/>);
                })}
                {/* <FormControlLabel value="100" control={<Radio />} label="100" />
                        <FormControlLabel value="200" control={<Radio />} label="200" />
                        <FormControlLabel value="300" control={<Radio />} label="300" />
                        <FormControlLabel value="400" control={<Radio />} label="400" /> */}
                <FormControlLabel value="" control={<Radio/>} label="all levels"/>
            </RadioGroup>
            <h2>学分</h2>
            <RadioGroup value={props.creditNumber} onChange={props.setCreditNumber}>
                {CREDITS.map((input) => {
                    return (<FormControlLabel value={input} control={<Radio/>} label={input}/>);
                })}
                {/* <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="5" control={<Radio />} label="5" /> */}
                <FormControlLabel value="" control={<Radio/>} label="all credits"/>
            </RadioGroup>
            <h2>课程类型</h2>
            <RadioGroup value={props.courseType} onChange={props.setCourseType}>
                {CREDIT_TYPES.map((input) => {
                    return (<FormControlLabel value={input} control={<Radio/>} label={input}/>);
                })}
                {/* <FormControlLabel value="C" control={<Radio />} label="C" />
                        <FormControlLabel value="DIV" control={<Radio />} label="DIV" />
                        <FormControlLabel value="I&S" control={<Radio />} label="I&S" />
                        <FormControlLabel value="None" control={<Radio />} label="None" />
                        <FormControlLabel value="NW" control={<Radio />} label="NW" />
                        <FormControlLabel value="QSR" control={<Radio />} label="QSR" />
                        <FormControlLabel value="VLPA" control={<Radio />} label="VLPA" />
                        <FormControlLabel value="W" control={<Radio />} label="W" /> */}
                <FormControlLabel value="" control={<Radio/>} label="all credit types"/>
            </RadioGroup>
        </div>
    )
}

