import React, { Component, useState, useEffect } from "react"
import "./CourseCard.css"
import Img from "./Mapping"
import { NavLink } from 'react-router-dom'
import like from '../../img/like.svg';
import unlike from '../../img/unlike.svg';
import ServerConfig from "../config/ServerConfig";
import {withRouter, Redirect} from 'react-router-dom';


const CourseCard = (props) => {
    /* 需要有传进的props以显示对应的课程和正确链接 */

    // use hooks to lead user to login page if not login
    const [login, setLogin] = useState(false); // TODO

    const isFavorite = (loginStatus, name) => {
        if(!loginStatus) {
            return false;
        }   else {
            fetch(ServerConfig.SERVER_URL + "/api/isFavorite", {
                body: JSON.stringify({
                    courseName: name.toLowerCase()
                }),
                credentials: "include",
                method: "POST"
            }).then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    console.log(res);
                }
            }).then(data => {
                console.log(data);
                if(data.state === 0) {
                    return false;
                } else {
                    return true;
                }
            })
        }
    }

    // isFavorite(props.loginStatus, props.courseName)
    const [favorite, setFavorite] = useState(props.isFavorite);

    const toggleLike = (e, name, loginStatus, setLogin) => {
        // TODO
        setFavorite(!favorite);
        e.preventDefault();
        // if user do not login, redirect to login page TODO
        if(!loginStatus) {
            setLogin(true);
            alert("Please login first!");
            return
        }
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
                if(data.state === 0){
                    alert("已取消收藏");
                    //window.location.reload(true);
                } else {
                    alert("已收藏");
                    //window.location.reload(true);
                }
            })
    }

    // setFavorite(isFavorite(login, props.name));
    // const favorite = () => {isFavorite(props.loginStatus, props.courseName)}; // TODO
    console.log(favorite);
    //setFavorite(isFavorite(props.loginStatus, props.courseName));
    // useEffect (() => {
    //     setFavorite(isFavorite(props.loginStatus, props.courseName));
    // }, []);
    const firstNonAlpha = props.courseName.search(/\d/);
    let name = props.courseName.substring(0, firstNonAlpha).toUpperCase();
    if (Img[name] === undefined) {
        name = "DEFAULT";
    }

    // useEffect(() => {
    //     toggleLike(props.courseName);
    //     document.getElementById("favorite-img").src = favorite ? like : unlike;
    // });

    // if user do not login and press favorite, redirect to login page TODO
    if (login) { // TODO
        return (<Redirect to="/login" />)
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
                                    </div>
                                </div>);
                            })}

                            <div class="tag credit">
                                <div class="tooltips" id="5cre">
                                    <p>{props.credit}</p>
                                </div>
                            </div>

                            {/* toggleLike(e, props.courseName, props.loginStatus, setLogin)*/}
                            <div class="add favorite" onClick={(e) => toggleLike(e, props.courseName, props.loginStatus, setLogin)}>
                                <div class="tooltips" id="add">
                                    {favorite ? <img src={like} alt="like" /> : <img src={unlike} alt="unlike" />}
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