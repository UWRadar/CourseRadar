import React, { useState } from "react"
import { Button, TextField, Checkbox } from '@material-ui/core/Checkbox'
import useFilterStates from "../search-result-page"
import SearchIcon from '@material-ui/icons/Search';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';

import "./SearchFilter.css"

export default function SearchFilter() {
    const selectionIcon = (
        <div id="selection-icon">
            <img src="./img/vector.png"  alt="logo for selection"/>
        </div>
    )
    const levels = [100, 200, 300, 400];
    const credits = [1, 2, 3, 4, 5];
    const creditTypes = ["c", "div", "i&s", "na", "nw", "qsr", "vlpa", "w"];

    const getFilters = useFilterStates()[0];
    const updateFilters = useFilterStates()[1];

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
            if (item === curSelected)
            result.push(
                <Checkbox
                    checked={checked}
                    className={`filter-sub-check-box ${tag}`}
                    onChange={onChangeFilterCheckbox}
                    id={item}
                />
            )
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

    const levelCheckbox = generateCheckboxArr(levels, getFilters[0], checked, "level");
    const creditCheckbox = generateCheckboxArr(credits, getFilters[1], checked, "credit");
    const creditTypeCheckbox = generateCheckboxArr(creditTypes, getFilters[2], checked, "creditType");

    // Read checkbox status, call updateFilters to update the filter model
    const onChangeFilterCheckbox = () => {
        toggleIsFirstClick(false);
        const level = document.querySelectorAll(".level");
        const credit = document.querySelectorAll(".credit");
        const creditType = document.querySelectorAll(".creditType");
        const selectedlevel = selectedItem(level);
        const selectedCredit = selectedItem(credit);
        const selectedCreditType = selectedItem(creditType);
        updateFilters(selectedlevel, selectedCredit, selectedCreditType, getFilters[3]);
    };

    const onChangeCourseNameTextInput = (event) => {
        updateFilters(getFilters[0], getFilters[1], getFilters[2], event.target.value);
    };

    const baseUrl = "localhost:9000";

    // Search query. onClickUpdateFilterBtn
    const searchFilters = () => {
        const url = baseUrl + "/api/search";
        // TODO: validation
        // TODO: finish this
    };


    return (
        <div>
            <Checkbox value="" >
                {selectionIcon}
            </Checkbox>
            <Checkbox
                value={filterItems[0]}
                class="filter-items-check-box">
                {levelCheckbox}
            </Checkbox>
            <Checkbox
                value={filterItems[1]}
                class="filter-items-check-box">
                {creditCheckbox}
            </Checkbox>
            <Checkbox
                value={filterItems[2]}
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