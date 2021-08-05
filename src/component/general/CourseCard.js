import React, { Component } from "react"
import "./CourseCard.css"
import Img from "./Mapping"
import { NavLink } from 'react-router-dom'

const CourseCard = (props) => {
    /* 需要有传进的props以显示对应的课程和正确链接 */
    const firstNonAlpha = props.courseName.search(/\d/);
    let name = props.courseName.substring(0, firstNonAlpha).toUpperCase();
    if (Img[name] == undefined) {
        name = "DEFAULT";
    }
        
    return (
        <NavLink
            to={"/CourseDetail/" + props.courseName.replace("/\s/g", "")}
            id="courseCardLink"
        >
            <div className="course-card">
                <div className="recom-cards" aria-label="recommendation">
                    <div className="course-title" style={{ backgroundImage: `url(${Img[name]?.default})` }}>
                        <div className="course-title-wrap">
                            <p>{props.courseName.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="recom-description">
                        <h1>{props.courseDescription}</h1>


                        <div class="describtion-tags">
                            {props.tags.map(element => {
                                return (<div class={"tag " + element} npnp>
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
        </NavLink>
    )
}

export default CourseCard