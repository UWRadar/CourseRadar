import React from "react"
import "./Banner.css"
const Banner = (props) => {
    return (
        <div className="banner">
            <button className="arrow arrow-left"></button>
            <div className="main">
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
                <p className="hide-on-mobile">{props.description}</p>
                <button className="hide-on-mobile">详情</button>
            </div>
            <button className="arrow arrow-right"></button>
        </div>
    )
}

export default Banner