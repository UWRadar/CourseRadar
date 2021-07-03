import React, { useState } from "react"
import { Button, TextField, Checkbox, MenuItem } from '@material-ui/core'
import { Grid } from '@material-ui/core';

import Select from '@material-ui/core/Select';
import SearchResultPage from "../search-result-page/SearchResultPage.js"

import "./SearchFilter.css"

export default function SearchFilter() {
    const selectionIcon = (
        <div id="selection-icon">
            <img src="./img/vector.png"  alt="logo for selection"/>
        </div>
    )


    /*
    [
        {
            type: "level",
            value: 100 (or array)
        },
        {
            ...
        }
    ]
    */

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
        {type: "creditType", value: "W"}
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
        toggleIsFirstClick(false);
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
        const url = "http://localhost:9000/api/search";
        let currentUrl = url;
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

        // check courseName
        if (curCourseName != "") {
            if (currentUrl === url) {
                currentUrl += "?";
            }
            currentUrl += "courseName=" + curCourseName;
        }
        // check level
        if (curLevel.length !== 0) {
            if (currentUrl === url) {
                currentUrl += "?level=" + curLevel.join("/");
            } else {
                currentUrl += "&level=" + curLevel.join("/");
            }
        }
        // check credit
        if (curCredit.length !== 0) {
            if (currentUrl === url) {
                currentUrl += "?credit=" + curCredit.join("/");
            } else {
                currentUrl += "&credit=" + curCredit.join("/");
            }
        }
        // check creditType
        if (curCreditType.length !== 0) {
            if (currentUrl === url) {
                currentUrl += "?creditType=" + curCreditType.join("/");
            } else {
                currentUrl += "&creditType=" + curCreditType.join("/");
            }
        }
        console.log(currentUrl);

        fetch(currentUrl)
            .then(checkStatus)
            // .then(res => res.json())
            .then(res => SearchResultPage(res))
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

    return (
        <div>
            <Select value=" " onClick={(event) => event.stopPropagation()}>
                <MenuItem value=" ">
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
                        dropDownRegion("Credit Type", 9, 16)
                    }
                </div>
            </Select>
            <TextField
                id="large-header-input"
                placeholder="想要找啥课啊..."
                onChange={onChangeCourseNameTextInput}/>
            <Button
                className={isFirstClick? "btn-first-click" : "btn-update-click"}
                id="apply-filter-btn"
                onClick={searchFilters}
            >
            Search</Button>
        </div>
    )
}

function checkStatus(response) {
    if (response.ok) {
        return response.text()
    } else {
        return Promise.reject(new Error(response.status + ": " + response.statusText))
    }
}