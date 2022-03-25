import React from "react";
import "./HoverComponent.css";

const HoverComponent = (props) => {
    const rating = props.rating;
    console.log(rating);

    return (
        <div className={"hover"}>
            <p>5分：{rating[4]}</p>
            <p>4分：{rating[3]}</p>
            <p>3分：{rating[2]}</p>
            <p>2分：{rating[1]}</p>
            <p>1分：{rating[0]}</p>
        </div>
    )
}

export default HoverComponent