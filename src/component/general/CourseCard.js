import React, { Component } from "react"
import "./CourseCard.css"
import Img from "./Mapping"
import { NavLink } from 'react-router-dom'
import like from '../../img/talk-active.png';
import ServerConfig from "../config/ServerConfig";

const toggleLike = (e, name) => {
    e.preventDefault();
    console.log(name);
    fetch(ServerConfig.SERVER_URL + "/api/togglelike", {
        body: JSON.stringify({
            courseName: name.toLowerCase()
        }),
        credentials: "include",
        method: "POST"
    })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                console.log(res);
            }
        })
        .then(data => {
            console.log(data);
            if(data.state === 0){
                alert("已取消收藏");
                window.location.reload(false);
            } else {
                alert("已收藏");
            }
        })
}

const CourseCard = (props) => {
    /* 需要有传进的props以显示对应的课程和正确链接 */
    console.log(props);
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
                        <div className="course-name">
                            <h1>{props.courseDescription}</h1>
                        </div>
                        


                        <div class="describtion-tags">
                            { (props.tags === null) ? null : props.tags.map(element => {
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

                            <div class="add favorite" onClick={(e) => toggleLike(e, props.courseName)}>
                                <div class="tooltips" id="add">
                                    <img src={like} alt="like"  />
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