import React, { useState } from "react"
import InputBase from "@material-ui/core/InputBase"
import SearchDropDown from "./SearchDropDown"
import SearchIcon from "@material-ui/icons/Search"

const SearchBar = (props) => {
    const [searchTerm, setSearchTerm] = useState(0)
    const search = () => {
        console.log(searchTerm)
    }
    return (
        <div class="search-bar">
            <SearchDropDown />
            <InputBase
                className="large-header-input"
                placeholder="想要找什么课～..."
                onChange={evt => setSearchTerm(evt.target.value)}
                onKeyDown={evt => {
                    if (evt.key == "Enter") {
                        search()
                    }
                }}
            />
            <SearchIcon
                className="search-icon"
                onClick={search}
            />
        </div>
    )
}

export default SearchBar