import React, { useState } from "react"
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { InputLabel, MenuItem } from "@material-ui/core";
import ListItemIcon from '@material-ui/core/ListItemIcon';

import "./SearchDropDown.css"
export default function SearchDropDown() {
    const icon =
        (
            <div id="selection-icon">
                <img src="./img/vector.png" alt="logo for selection" />
            </div>
        )
    const [displayFilter, setDisplayFilter] = useState(false)

    return (

        // <div className="selection-group">
        //     <button className="btn" onClick={(event) => {setDisplayFilter(!displayFilter)}}>
        //         {icon}
        //     </button>

        // {displayFilter &&
        //     <ul className="list-group listing">
        //         <li className="list-group-item">Cras justo odio</li>
        //         <li className="list-group-item">Dapibus ac facilisis in</li>
        //         <li className="list-group-item">Morbi leo risus</li>
        //         <li className="list-group-item">Porta ac consectetur ac</li>
        //         <li className="list-group-item">Vestibulum at eros</li>
        //     </ul>
        // }
        // </div>
        <Select value=" " onClick={(event) => event.stopPropagation()}>
            <MenuItem value=" ">
                {icon}
            </MenuItem>
            <div className="selection-container">
                {
                    dropDownRegion("Course Level", ["100", "200", "300", "400"])
                }

                {
                    dropDownRegion("Credit", ["1", "2", "3", "4", "5"])
                }

                {
                    dropDownRegion("Gen Edu Req", ["VLPA", "QSR", "NW", "I&S"])
                }
            </div>
        </Select>
    )
}

function dropDownRegion(regionName, options) {
    return (
        <div onClick={(event) => { event.stopPropagation() }}>
            <MenuItem value="level" className="selection">
                <p>{regionName}</p>
                <div>
                    {options.map(element => {
                        return (
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    {element}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </MenuItem>
        </div>
    )
}