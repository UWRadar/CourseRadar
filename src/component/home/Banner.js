import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import "./Banner.css"
const Banner = (props) => {
    const bannerItems = []
    for (const key in props.items) {
        const thisProps = props.items[key]
        bannerItems.push(
            <div
                className={"banner" + (() => {
                    if (key < props.active) {
                        return " before"
                    } else if (key > props.active) {
                        return " after"
                    } else {
                        return ""
                    }
                })()}
                style={{
                    backgroundImage: "linear-gradient(to right, var(--theme-color), transparent), url(" + thisProps.image + ")"
                }}
            >
                <button
                    className="arrow arrow-left"
                    title="上一张"
                    onClick={() => {
                        props.onChange(-1)
                    }}
                ></button>
                <div className="main">
                    <h1>{thisProps.title}</h1>
                    <h2>{thisProps.subtitle}</h2>
                    <p className="hide-on-mobile">{thisProps.description}</p>
                    {/* 微信公众号界面链接 */}
                    <NavLink
                        to="/"
                        activeStyle={{
                            color: "white",
                        }}>
                        <button className="hide-on-mobile">详情</button>
                    </NavLink>

                </div>
                <button
                    className="arrow arrow-right"
                    title="下一张"
                    onClick={() => {
                        props.onChange(1)
                    }}
                ></button>
            </div>
        )
    }
    return (
        <div
            className="banner-placeholder"
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <div className="banner-area">{bannerItems}</div>
        </div>
    )
}

export default Banner