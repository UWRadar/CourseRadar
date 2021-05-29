import React, { Component } from "react"
import "./CourseCard.css"
const CourseCard = (props) => {
    return (
        <div className="course-card">
            <div className="recom-cards" aria-label="recommendation">
                <div className="course-title">
                    <div className="course-title-wrap">
                        <p>{props.courseName}</p>
                    </div>
                </div>
                <div className="recom-description">
                    <h1>{props.courseDescription}</h1>


                    <div class="describtion-tags">
                        {props.tags.map(element => {
                            return (<div class={"tag " + element}npnp>
                                <div class="tooltips" id={element.toUpperCase()}>
                                    <p>{element.toUpperCase()}</p>
                                    {/* <span class="tooltiptext"> Quantitative and Symbolic Reasoning</span> */}
                                </div>
                            </div>);
                        })}
                        
                            
                        <div class="tag credit">
                            <div class="tooltips" id="5cre">
                                <p>{props.credit}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard