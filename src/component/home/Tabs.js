import React from "react"
import "./Tabs.css"
const Tabs = (props) => {
    const tabItems = []
    for (const key in props.items) {
        const thisProps = props.items[key]
        tabItems.push(
            <button className={thisProps.id == props.active ? "active" : ""}>
                <img src={thisProps.icon} alt />
                <span>{thisProps.text}</span>
            </button>
        )
    }
    return <div className="tabs">{tabItems}</div>
}

export default Tabs