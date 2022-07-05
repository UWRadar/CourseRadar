import React from "react";
import "./Tabs.css";
import ImageStorage from "../general/ImageStorage.js";

function Tabs(props) {
    const tabItems = props.items.map((element, index) =>
        <button id="trendy"
            className={element.id === props.active ? "active" : ""}
            key={index}
            onClick={() => props.setActiveTab(element.id)}
        >
            <img src={ImageStorage[element.icon]} alt="" />
            <span>{element.text}</span>
        </button>
    );
    return <div className="tabs">{tabItems}</div>
}

export default Tabs;
