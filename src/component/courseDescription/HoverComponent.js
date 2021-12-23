import React from "react";
import "./HoverComponent.css";

const HoverComponent = (props) => {
    console.log(props);

    return (
        <div className={"hover"}>
            <p>5分：</p>
            <p>4分：</p>
            <p>3分：</p>
            <p>2分：</p>
            <p>1分：</p>
        </div>
    )
}

export default HoverComponent