import React from "react"
import "./Tabs.css"
import ImageStorage from "../general/ImageStorage.js"
const Tabs = (props) => {
    const tabItems = []

    for (const key in props.items) {
        const thisProps = props.items[key]
        tabItems.push(
            <button id="trendy" 
                className={thisProps.id == props.active ? "active" : ""} 
                onClick={() => props.setActiveTab(thisProps.id)}
            >
                <img src={ImageStorage[thisProps.icon]} alt />
                <span>{thisProps.text}</span>
            </button>
        )
    }
    return <div className="tabs">{tabItems}</div>
}

export default Tabs