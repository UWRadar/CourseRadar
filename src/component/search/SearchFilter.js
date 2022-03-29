import React, { useState } from "react"
import { Button, TextField, Checkbox, MenuItem, ListItemIcon } from '@material-ui/core'
import {useHistory} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Menu from '@material-ui/core/Menu';
import "./SearchFilter.css"
import ImageStorage from "../general/ImageStorage"
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

// Redux
import { setCourseName, setCourseLevel, setCreditNumber, setCourseType } from './controller/SearchQuerySlice'
import {useDispatch} from "react-redux";

const LEVELS = ["100", "200", "300", "400", "500"];
const CREDITS = ["1", "2", "3", "4", "5", "5+"];
// Took out None, since it's also a utility value (should be mutually exclusive selection)
const CREDIT_TYPES = ["C", "DIV", "I&S", "NW", "QSR", "VLPA", "W"];

export default function SearchFilter(props) {
    const dispatch = useDispatch();

    const [openMenu, setOpenMenu] = useState(false);

    const selectionIcon = (
        <div id="selection-icon" style={{marginBottom: "10px"}}>
            <img src={ImageStorage.selection}  alt="logo for selection"/>
        </div>
    )

    // Rename to *Local to distinguish between local state and global state that's shared across 2 components.
    const [courseNameLocal, setCourseNameLocal] = useState("");
    const [courseLevelLocal, setCourseLevelLocal] = useState(["all"]);
    const [creditNumberLocal, setCreditNumberLocal] = useState(["all"]);
    const [courseTypeLocal, setCourseTypeLocal] = useState(["all"]);

    // Apply Filters Btn: first click or else
    const [isFirstClick, toggleIsFirstClick] = useState(true);

    // Custom data cleaning function to account for mutually exclusive selection
    function handleFilterChange(destination, newValue) {
        //console.log("handleFilterChange(" + destination + ", " + newValue);
        let url = new URL(document.URL);
        let params = new URLSearchParams(url.search);
        if (destination === "courseLevel") {
            // ES6 way to copy/clone an array
            let newCourseLevel = [...courseLevelLocal];

            // Toggling between all and not all
            if (newValue === "all" && courseLevelLocal.indexOf("all") < 0) {
                newCourseLevel = ["all"];
            } else if (courseLevelLocal[0] === "all" && newValue !== "all") {
                newCourseLevel = [newValue];
            }
            // When it's not all, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && courseLevelLocal.indexOf(newValue) >= 0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedLevel = newCourseLevel.filter(e => e !== newValue);
                if (updatedLevel[0] === "" || updatedLevel.length === 0) {
                    newCourseLevel = ["all"];
                } else {
                    newCourseLevel = updatedLevel;
                }
            } else if (newValue !== "all" && courseLevelLocal.indexOf(newValue) < 0) {
                // Non Mutative way to concat an array
                newCourseLevel = courseLevelLocal.concat(newValue);
            }
            setCourseLevelLocal(newCourseLevel);
        } else if (destination === "creditNumber") {
            // ES6 way to copy/clone an array
            let newCreditNumber = [...creditNumberLocal];

            // Toggling between all and not all
            if (newValue === "all" && creditNumberLocal.indexOf("all") < 0) {
                newCreditNumber = ["all"];
            } else if (creditNumberLocal[0] === "all" && newValue !== "all") {
                newCreditNumber = [newValue];
            }
            // When it's not all, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && creditNumberLocal.indexOf(newValue) >= 0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedCreditNumber = newCreditNumber.filter(e => e !== newValue);
                if (updatedCreditNumber[0] === "" || updatedCreditNumber.length === 0) {
                    newCreditNumber = ["all"];
                } else {
                    newCreditNumber = updatedCreditNumber;
                }
            } else if (newValue !== "all" && creditNumberLocal.indexOf(newValue) < 0) {
                // Non Mutative way to concat an array
                newCreditNumber = creditNumberLocal.concat(newValue);
            }
            setCreditNumberLocal(newCreditNumber);
        } else if (destination === "courseType") {
            // ES6 way to copy/clone an array
            let newCourseType = [...courseTypeLocal];

            // Toggling between all and not all
            if (newValue === "all" && courseTypeLocal.indexOf("all") < 0) {
                newCourseType = ["all"];
            } else if (courseTypeLocal[0] === "all" && newValue !== "all" && newValue !== "None") {
                newCourseType = [newValue];
            }
            // Toggle between None and not None
            else if (newValue === "None" && courseTypeLocal.indexOf("None") < 0) {
                newCourseType = ["None"];
            } else if (courseTypeLocal[0] === "None" && newValue !== "all" && newValue !== "None") {
                newCourseType = [newValue];
            }
            // When it's not all and not none, remove value if it's exist, except we do all if we have nothing left
            else if (newValue !== "all" && newValue !== "None" && courseTypeLocal.indexOf(newValue) >= 0) {
                // ECMA6 method to remove by value (all occurrences) in an array (it makes a copy without modifying original array)
                const updatedCourseType = newCourseType.filter(e => e !== newValue);
                console.log(updatedCourseType);
                if (updatedCourseType[0] === "" || updatedCourseType.length === 0) {
                    newCourseType = ["all"];
                } else {
                    newCourseType = updatedCourseType;
                }
            } else if (newValue !== "all" && newValue !== "None" && courseTypeLocal.indexOf(newValue) < 0) {
                // Non-Mutative way to concat an array
                newCourseType = courseTypeLocal.concat(newValue);
            }
            setCourseTypeLocal(newCourseType);
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const history = useHistory();

    // https://uwclassmate.com/search/cse142?course_level=all&credit_number=1.4&course_type=DIV.IS
    function submitSearch(event) {
        event.preventDefault();
        dispatch(setCourseName(courseNameLocal));
        dispatch(setCourseLevel(courseLevelLocal));
        dispatch(setCreditNumber(creditNumberLocal));
        dispatch(setCourseType(courseTypeLocal));

        const paramsObj = {course_level: courseLevelLocal.join("."), credit_number: creditNumberLocal.join("."), course_type: courseTypeLocal.join(".")}
        const searchParams = new URLSearchParams(paramsObj);
        history.push({pathname:"/search/" + courseNameLocal + "?" + searchParams.toString(), state: [courseNameLocal, courseLevelLocal, creditNumberLocal, courseTypeLocal]});
    }

    return (
        <div className="search-bar">
            <Button onClick={handleClick}>
                <FontAwesomeIcon className="filterIcon" icon={faCaretDown} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem value="">
                    {selectionIcon}
                </MenuItem>

                <DropdownFilter courseLevel={courseLevelLocal} creditNumber={creditNumberLocal} courseType={courseTypeLocal}
                              handleFilterChange={handleFilterChange}/>
        </Menu>
            <TextField
                className="large-header-input"
                id="outlined-basic"
                label="搜索"
                placeholder="想要找什么课～.. 例如：CSE 142, Engl"
                onKeyDown={(e) => {if (e.keyCode === 13) submitSearch(e);}}
                value={courseNameLocal}
                onChange={(event)=>setCourseNameLocal(event.target.value)}/>
            <button
                className="btn searchButton"
                id="apply-filter-btn"
                onClick={submitSearch}
            >
            Search</button>
        </div>

    )
}

function DropdownFilter(props) {
    return (
        <div className="selection-container">
            <div className="header_filter_column">
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
            </div>
            <div className="header_filter_column">
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
            </div>
            <div className="header_filter_column">
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
        </div>
    )
}
