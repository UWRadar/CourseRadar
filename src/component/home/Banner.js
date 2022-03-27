import React, { useState } from "react"
import { Component } from "react"
import { NavLink } from "react-router-dom"
import "./Banner.css"
export class Banner extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    renderAnItem(index, position) {
        const item = this.props.items[index]
        if (!item) {
            return <div></div>
        }
        return (
            <div

                className={"banner" + position}
                style={{
                    backgroundImage: "linear-gradient(to right, var(--theme-color), transparent), url(" + item.image + ")"
                }}>
                <button
                    className="arrow arrow-left"
                    title="上一张"
                    onClick={() => {
                        this.props.onChange(-1)
                    }}
                ></button>
                <div
                    onClick={() => {
                        window.open(item.link)
                    }}
                    className="main">
                    <h1>{item.title}</h1>
                    <h2>{item.subtitle}</h2>
                    <p className="hide-on-mobile">{item.description}</p>
                    {/* 微信公众号界面链接 */}
                    <NavLink
                        to="/"
                        activeStyle={{
                            color: "white",
                        }}>
                        <button
                            className="hide-on-mobile"
                            onClick={() => {
                                window.open(item.link)
                            }}>
                            详情
                        </button>
                    </NavLink>

                </div>
                <button
                    className="arrow arrow-right"
                    title="下一张"
                    onClick={() => {
                        this.props.onChange(1)
                    }}
                ></button>
            </div>
        )
    }

    render() {
        const active = this.props.active
        const bannerItems = []
        bannerItems.push(this.renderAnItem(this.props.items.length - 1, active == -1 ? "" : " before"))
        for (const index in this.props.items) {
            bannerItems.push(this.renderAnItem(index, (() => {
                if (active === true || active == index) {
                    return ""
                } else if (index < active) {
                    return " before"
                } else {
                    return " after"
                }
            })()))
        }
        bannerItems.push(this.renderAnItem(0, active == this.props.items.length ? "" : " after"))
        return (
            <div
                className="banner-placeholder"
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}>
                <div className={"banner-area" + (this.props.noAnimation ? " no-animation" : "")}>{bannerItems}</div>
            </div>
        )
    }
}

export default Banner