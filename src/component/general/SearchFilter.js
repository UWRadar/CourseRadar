import React, { useState } from "react"
import { Button, TextField, Checkbox, MenuItem, ListItemIcon } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import "./SearchFilter.css"
import ImageStorage from "../general/ImageStorage"

export default function SearchFilter(props) {

    const history = useHistory();

    const selectionIcon = (
        <div id="selection-icon" style={{marginBottom: "10px"}}>
            <img src={ImageStorage.selection}  alt="logo for selection"/>
        </div>
    )



    // level: 0-3, credit: 4-8, creditType: 9-16
    const FILTER_ITEMS = [
        {type: "level", value: 100},
        {type: "level", value: 200},
        {type: "level", value: 300},
        {type: "level", value: 400},
        {type: "credit", value: 1},
        {type: "credit", value: 2},
        {type: "credit", value: 3},
        {type: "credit", value: 4},
        {type: "credit", value: 5},
        {type: "creditType", value: "C"},
        {type: "creditType", value: "DIV"},
        {type: "creditType", value: "I&S"},
        {type: "creditType", value: "N/A"},
        {type: "creditType", value: "NW"},
        {type: "creditType", value: "QSR"},
        {type: "creditType", value: "VLPA"},
    ];

    // const [filters, setFilters] = useState([
    //     // initialize textInput filter in the default state
    //     {
    //         type: "courseName",
    //         value: ""
    //     }
    // ]);


    // Checkbox (updated)
    const [checkedState, setCheckedState] = useState(new Array(FILTER_ITEMS.length).fill(false));
    const [courseName, setCoursename] = useState("");
    // onClickCheckbox (updated)
    const handleOnChangeClickBox = (start, end, position, isSingleChoice) => {
        const updatedChecked = checkedState.map((item, index) =>{
            if (isSingleChoice && index >= start && index <= end && index != position) {
                return false;
            } else {
                return index === position ? !item : item
            }
            
        });
        setCheckedState(updatedChecked);
        let tempFilter = props.filters;
        tempFilter.credit = -1;
        tempFilter.level = -1;
        tempFilter.creditType = [];
        for (let i = 0; i < updatedChecked.length; i++) {
            if (updatedChecked[i]) {
                let key = FILTER_ITEMS[i].type;
                if (key === "creditType") {
                    tempFilter[key].push(FILTER_ITEMS[i].value);
                    continue;
                }
                tempFilter[key] = FILTER_ITEMS[i].value;

            }
        }
        props.updateFilter(tempFilter);
        console.log(props.filters);
    };

    // Autofill input base: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill



    // textInput onChange (updated)
    const onChangeCourseNameTextInput = (event) => {
        let curFilterArr = props.filters;
        // update courseName value in filters
        curFilterArr.courseName = event.target.value;
        props.updateFilter(curFilterArr);
    };

    // generate Checkbox tags (updated)
    const generateCheckboxArr = (startIndex, endIndex, isSingleChoice) => {
        const result = [];
        for (let i = startIndex; i <= endIndex; i++) {
            result.push(
                <div className="single-filter-item">
                    <Checkbox
                        checked={checkedState[i]}
                        onChange={() => handleOnChangeClickBox(startIndex, endIndex, i, isSingleChoice)}
                        className="checkbox"
                    />
                    <label> {FILTER_ITEMS[i].value} </label>
                </div>
            )
        }
        return result;
    }

    // Search query. onClickUpdateFilterBtn (updated)
    // example url input: /api/search?courseName=cse&level=100/200&credit=1/2&creditType=i&s/qsr
    const searchFilters = () => {
        console.log(props.filters)
        let curCourseName = props.filters.courseName;
        let curLevel = props.filters.level === -1 ? "" : props.filters.level.toString();
        let curCredit = props.filters.credit === -1 ? "" : props.filters.credit.toString();
        let curCreditType = props.filters.creditType;

        curCreditType = curCreditType.join("/");
        history.push({
            pathname: "/search",
            state: [curCourseName, curLevel, curCredit, curCreditType]
        });
        setCheckedState(new Array(FILTER_ITEMS.length).fill(false));
    };

    const dropDownRegion = (regionName, startIndex, endIndex, isSingleChoice) => {
        return (
            <div onClick={(event) => {event.stopPropagation()}}>
                <MenuItem value="level" className="selection">
                    <Grid>
                        <p>{regionName}</p>
                        {generateCheckboxArr(startIndex, endIndex, isSingleChoice)}
                    </Grid>
                </MenuItem>
            </div>
        )
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div className="search-bar">
            
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem value="">
                    {selectionIcon}
                </MenuItem>


                <div className="selection-container">
                    {
                        dropDownRegion("Course Level", 0, 3, true)
                    }

                    {
                        dropDownRegion("Credit", 4, 8, true)
                    }

                    {
                        dropDownRegion("Credit Type", 9, 15, false)
                    }
                </div>
        </Menu>
            <TextField
                className="large-header-input"
                id="outlined-basic"
                label="搜索"
                placeholder="e.g. CSE 142, Engl"
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        searchFilters();
                    }
                }}
                onChange={onChangeCourseNameTextInput}/>
            <Button onClick={handleClick}>
                <FontAwesomeIcon className="filterIcon" icon={faCaretDown} />
            </Button>
            <button
                className="btn searchButton"
                id="apply-filter-btn"

                onClick={searchFilters}
            >
            Search</button>
        </div>

    )
}
