import React, {Component} from "react"
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
                <img src="./img/vector.png"  alt="logo for selection"/>
            </div>
        )


    return (
        <Select
            value=" "
            >    
            <MenuItem value=" ">
                {icon}      
            </MenuItem>
            <MenuItem value="level"> course level </MenuItem>
        </Select>   
    )
}