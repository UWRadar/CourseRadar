import React, { Component } from "react"
import "./CourseCard.css"
const CourseCard = (props) => {
    return (
        <div>
            <div class="recom-cards" aria-label="recommendation">
                <div class="course-title">
                    <div class="course-title-wrap">
                        <p>INFO 340</p>
                    </div>
                </div>
                <div class="recom-description">
                    <h1>Introduction to the web design</h1>
                    <div class="describtion-tags">
                        <div class="tag qsr">
                            <p>QSR</p>
                        </div>
                        <div class="tag credit">
                            <p>5 Credits</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard