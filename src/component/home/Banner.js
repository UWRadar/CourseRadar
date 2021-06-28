import React, { useState } from "react"
import "./Banner.css"

const Banner = (props) => {
    const bannerItems = []
    const [active, setActive] = useState(0)
    const switchBanner = delta => {
        const newActive = active + delta
        if (newActive >= 0 && newActive < bannerItems.length) {
            setActive(newActive)
        } else if (newActive < 0) {
            setActive(bannerItems.length - 1)
        } else {
            setActive(0)
        }
    }

    for (const key in props.items) {
        const thisProps = props.items[key]
        bannerItems.push(
            <div
                className={"banner" + (() => {
                    if (key < active) {
                        return " before"
                    } else if (key > active) {
                        return " after"
                    } else {
                        return ""
                    }
                })()}
                style={{
                    backgroundImage: "linear-gradient(to right, var(--theme-color), transparent), url(" + thisProps.pic + ")"
                }}
            >
                <button
                    className="arrow arrow-left"
                    title="上一张"
                    onClick={() => {
                        switchBanner(-1)
                    }}
                ></button>
                <div className="main">
                    <h1>{thisProps.title}</h1>
                    <p className="hide-on-mobile">{thisProps.content}</p>
                    {/* <button className="hide-on-mobile" >详情</button> */}
                    <a href={thisProps.redirect_link} role="button" className="hide-on-mobile detail-button">详情</a>
                    {/* <Button redirect_link = {thisProps.redirect_link}/> */}
                </div>
                <button
                    className="arrow arrow-right"
                    title="下一张"
                    onClick={() => {
                        switchBanner(1)
                    }}
                ></button>
            </div>
        )
    }
    return (
        <div className="banner-placeholder">
            <div className="banner-area">{bannerItems}</div>
        </div>
    )
}

export default Banner