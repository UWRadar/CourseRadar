import React, { Component } from "react"
import "./CourseCard.css"
const CourseCard = (props) => {
    return (
        <div className="course-card">
            <div className="recom-cards" aria-label="recommendation">
                <div className="course-title">
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
    )
}

export default CourseCard