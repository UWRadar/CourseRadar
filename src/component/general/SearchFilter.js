import React, { useState, useEffect } from "react"
import { Button, TextField, Checkbox } from '@material-ui/core'
import useFilterStatus from "../search-result-page/useFilterStates"
import SearchIcon from '@material-ui/icons/Search';
// import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';

import "./SearchFilter.css"
import SearchResultPage from "../search-result-page/SearchResultPage";

export default function SearchFilter() {
    const selectionIcon = (
        <div id="selection-icon">
            <img src="./img/vector.png"  alt="logo for selection"/>
        </div>
    )
    const levels = [100, 200, 300, 400];
    const credits = [1, 2, 3, 4, 5];
    const creditTypes = ["c", "div", "i&s", "na", "nw", "qsr", "vlpa", "w"];


    // const [courseName, setCourseName] = useState("cse");
    // const [level, setLevel] = useState(100);
    // const [credit, setCredit] = useState(5);
    // const [creditType, setCreditType] = useState("nw");

    // const getFilters = () => {
    //     return [courseName, level, credit, creditType];
    // };

    // const updateFilters = (newCourseName, newLevel, newCredit, newCreditType) => {
    //     setCourseName(newCourseName);
    //     setLevel(newLevel);
    //     setCredit(newCredit);
    //     setCreditType(newCreditType);
    // };

    const [filters, setFilters] = useState({
        courseName: "cse",
        level: 100,
        credit: 5,
        creditType: "nw"
    });

    const {courseName, level, credit, creditType} = filters;

    // Checkbox
    const [checked, setChecked] = useState(true);

    // onClickCheckbox
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };

    // TODO: Autofill input base: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill

    // Apply Filters Btn: first click or else
    const [isFirstClick, toggleIsFirstClick] = useState(true);

    // Filter States see useFilterStates.js



    const filterItems = ["level", "credit", "creditType"];

    const generateCheckboxArr = (array, curSelected, checked, tag) => {
        const result = [];
        for (const item in array) {
            if (item === curSelected) {
                result.push(
                    <Checkbox
                        checked={checked}
                        className={`filter-sub-check-box ${tag}`}
                        onChange={onChangeFilterCheckbox}
                        id={item}
                    />
                )
            }
        }
        return result;
    }

    const selectedItem = (checkboxArr) => {
        for (const cb in checkboxArr) {
            if (cb.checked) {
                return cb;
            }
        }
    }

    const levelCheckbox = generateCheckboxArr(levels, filters.level, checked, "level");
    const creditCheckbox = generateCheckboxArr(credits, filters.credit, checked, "credit");
    const creditTypeCheckbox = generateCheckboxArr(creditTypes, filters.creditType, checked, "creditType");

    // Read checkbox status, call updateFilters to update the filter model
    const onChangeFilterCheckbox = () => {
        toggleIsFirstClick(false);
        const level = document.querySelectorAll(".level");
        const credit = document.querySelectorAll(".credit");
        const creditType = document.querySelectorAll(".creditType");
        console.log("11111");
        console.log(level);
        console.log(credit);
        console.log(creditType);
        const selectedlevel = selectedItem(level);
        const selectedCredit = selectedItem(credit);
        const selectedCreditType = selectedItem(creditType);
        setFilters({
            courseName: filters.courseName,
            level: selectedlevel,
            credit: selectedCredit,
            creditType: selectedCreditType
        });
    };

    const onChangeCourseNameTextInput = (event) => {
        setFilters({
            courseName: event.target.value,
            level: filters.level,
            credit: filters.credit,
            creditType: filters.creditType
        });
    };

    // Search query. onClickUpdateFilterBtn
    const searchFilters = () => {
        const url = "/api/search";
        let currentUrl = url;
        console.log(filters);
        let curCourseName = filters.courseName;
        let curLevel = filters.level;
        let curCredit = filters.credit;
        let curCreditType = filters.creditType.toUpperCase();

        //let [curCourseName, curLevel, curCredit, curCreditType] = getFilters;

        // edit creditType
        //curCreditType = curCreditType.toUpperCase();

        // check courseName
        if (curCourseName != "") {
            if (currentUrl === url) {
                currentUrl += "?";
            }
            currentUrl += "courseName=" + curCourseName;
        }
        // check level
        if (curLevel != null) {
            if (currentUrl === url) {
                currentUrl += "?level=" + curLevel;
            } else {
                currentUrl += "&level=" + curLevel;
            }
        }
        // check credit
        if (curCredit != null) {
            if (currentUrl === url) {
                currentUrl += "?credit=" + curCredit;
            } else {
                currentUrl += "&credit=" + curCredit;
            }
        }
        // check creditType
        if (curCreditType != null) {
            if (currentUrl === url) {
                currentUrl += "?creditType=" + curCreditType;
            } else {
                currentUrl += "&creditType=" + curCreditType;
            }
        }
        console.log(currentUrl);

        fetch(currentUrl)
            .then(checkStatus)
            .then(res => res.json())
            .then(SearchResultPage)
    };


    return (
        <div>
            <Checkbox value="" >
                {selectionIcon}
            </Checkbox>
            <Checkbox
                value={filterItems[0]}
                onChange={onChangeFilterCheckbox}
                class="filter-items-check-box">
                {levelCheckbox}
            </Checkbox>
            <Checkbox
                value={filterItems[1]}
                onChange={onChangeFilterCheckbox}
                class="filter-items-check-box">
                {creditCheckbox}
            </Checkbox>
            <Checkbox
                value={filterItems[2]}
                onChange={onChangeFilterCheckbox}
                class="filter-items-check-box">
                {creditTypeCheckbox}
            </Checkbox>
            <TextField
                id="large-header-input"
                placeholder="想要找啥课啊..."
                onChange={onChangeCourseNameTextInput}/>
            <SearchIcon id="search-icon"/>
            <Button
                className={isFirstClick? "btn-first-click" : "btn-update-click"}
                id="apply-filter-btn"
                onClick={searchFilters}
            >Apply Filters</Button>
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