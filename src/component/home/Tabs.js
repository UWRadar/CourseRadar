import React from "react"
import "./Tabs.css"
import ImageStorage from "../general/ImageStorage.js"
const Tabs = (props) => {
    const tabItems = []
    console.log(props)
    for (const key in props.items) {
        const thisProps = props.items[key]
        tabItems.push(
            <button
                id={thisProps.id}
                className={thisProps.id == props.active ? "active" : ""}
                onClick={() => {
                    props.onclick(thisProps.id)
                }}
            >
                <img src={ImageStorage[thisProps.icon]} alt />
                <span>{thisProps.text}</span>
            </button>
        )
    }
    return <div className="tabs">{tabItems}</div>
}

export default Tabs