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
                    <div className="describtion-tags">
                        <div className="tag qsr">
                            <p>QSR</p>
                        </div>
                        <div className="tag credit">
                            <p>5 Credits</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard