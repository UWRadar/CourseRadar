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
import SearchResultPage from "../home/SearchResultPage"

export default function SearchFilter(props) {

    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);

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
        // {type: "creditType", value: "W"}
    ];

    const [filters, setFilters] = useState([
        // initialize textInput filter in the default state
        {
            type: "courseName",
            value: ""
        }
    ]);

    // Apply Filters Btn: first click or else
    const [isFirstClick, toggleIsFirstClick] = useState(true);

    // Checkbox (updated)
    const [checkedState, setCheckedState] = useState(new Array(FILTER_ITEMS.length).fill(false));

    // onClickCheckbox (updated)
    const handleOnChangeClickBox = (position) => {
        // setChecked(event.target.checked);
        // toggleIsFirstClick(false);
        const updatedChecked = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedChecked);
        let tempFilterArr = [filters[0]];
        for (let i = 0; i < updatedChecked.length; i++) {
            if (updatedChecked[i]) {
                tempFilterArr.push(FILTER_ITEMS[i]);
            }
        }
        setFilters(tempFilterArr);
    };

    // Autofill input base: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill



    // textInput onChange (updated)
    const onChangeCourseNameTextInput = (event) => {
        let curFilterArr = filters;
        // update courseName value in filters
        curFilterArr[0].value = event.target.value;
        setFilters(curFilterArr);
    };

    // generate Checkbox tags (updated)
    const generateCheckboxArr = (startIndex, endIndex) => {
        const result = [];
        for (let i = startIndex; i <= endIndex; i++) {
            result.push(
                <div className="single-filter-item">
                    <Checkbox
                        checked={checkedState[i]}
                        onChange={() => handleOnChangeClickBox(i)}
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
        console.log(filters);
        let curCourseName = "";
        let curLevel = [];
        let curCredit = [];
        let curCreditType = [];
        for (let i = 0; i < filters.length; i++) {
            let element = filters[i];
            switch (element.type) {
                case 'courseName':
                    curCourseName = element.value;
                    break;
                case 'level':
                    curLevel.push(element.value);
                    break;
                case 'credit':
                    curCredit.push(element.value);
                    break;
                case 'creditType':
                    curCreditType.push(element.value);
                    break;
                default:
                    break;
            }
        }
        curLevel = curLevel.join("/");
        curCredit = curCredit.join("/");
        curCreditType = curCreditType.join("/");
        localStorage.setItem("courseName", curCourseName);
        localStorage.setItem("level", curLevel);
        localStorage.setItem("credit", curCredit);
        localStorage.setItem("creditType", curCreditType);
        history.push({
            pathname: "/search",
            state: [curCourseName, curLevel, curCredit, curCreditType]
        });

        // const response = await fetch(currentUrl);
        // const data = await checkStatus(response);
        // setSearchResultData(data.result);
        // console.log(data.result);

    };

    const dropDownRegion = (regionName, startIndex, endIndex) => {
        return (
            <div onClick={(event) => {event.stopPropagation()}}>
                <MenuItem value="level" className="selection">
                    <Grid>
                        <p>{regionName}</p>
                        {generateCheckboxArr(startIndex, endIndex)}
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


                <div className="selection-container">
                    {
                        dropDownRegion("Course Level", 0, 3)
                    }

                    {
                        dropDownRegion("Credit", 4, 8)
                    }

                    {
                        dropDownRegion("Credit Type", 9, 15)
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
            <button
                className="btn searchButton"
                id="apply-filter-btn"

                onClick={searchFilters}
            >
            Search</button>
        </div>

    )
}

