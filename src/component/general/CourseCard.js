import React, { Component } from "react"
import "./CourseCard.css"
import Img from "./mapping.js"
import { NavLink } from 'react-router-dom'

const CourseCard = (props) => {
    /* 需要有传进的props以显示对应的课程和正确链接 */
    const name = "INFO";
    return (
        <NavLink 
            to="/CourseDetail/:INFO340"
            style={{
                color: "black",
              }}>
            <div className="course-card">
                <div className="recom-cards" aria-label="recommendation">
                    <div className="course-title" style={{backgroundImage: `url(${Img[name].default})`}}>
                        <div className="course-title-wrap">
                            <p>INFO 340</p>
                        </div>
                    </div>
                    <div className="recom-description">
                        <h1>Introduction to the web design</h1>


                        <div class="describtion-tags">
                            <div class="tag qsr"npnp>
                                <div class="tooltips" id="QSR">
                                    <p>QSR</p>
                                    <span class="tooltiptext"> Quantitative and Symbolic Reasoning</span>
                                </div>
                            </div>
                                
                            <div class="tag credit">
                                <div class="tooltips" id="5cre">
                                    <p>5 </p>
                                    <span class="tooltiptext"> 5 Credits </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default CourseCard