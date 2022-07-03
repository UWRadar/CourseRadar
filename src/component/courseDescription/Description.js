import React, {useEffect, useState} from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Description.css";
import LinearProgressBar from "./LinearProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import SideHoverButtons from "../general/SideHoveringButtons";

function Description(props) {
    const difficulty = Math.round(props.courseItems.difficulty * 10) / 10;
    const grading = Math.round(props.courseItems.grading * 10) / 10;
    const workload = Math.round(props.courseItems.workload * 10) / 10;
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 20) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    return (
        <div>
            <div className="container-fluid" style={{ padding: 0 }}>
                {showButton && <SideHoverButtons/>}
                <div className="topHalf">
                    <div className="row" id="overlay">
                        <div className="col-12 col-lg-9 ">
                            <p className="courseCode">{props.courseName.toUpperCase()}</p>
                            <p className="courseName">{props.courseItems.courseFullName}</p>
                            <p className="courseCredit">{props.courseItems.credit + " credits"}</p>
                            {props.courseItems.creditType.split("/").map((element, index) => {
                                return <div key={index}>
                                    <div className="button type">{element}</div>
                                    {" "}
                                </div>
                            })}
                        </div>
                        <div className="col-12 col-lg-3" id="fillComment">
                            <div className="row">
                                <NavLink to="/survey">
                                    <button type="button" className="btn btn-primary" id="commentButton">填写课评</button>
                                </NavLink>
                                <a href={props.courseItems.myplanLink} className="myPlan"><FontAwesomeIcon icon={faExternalLinkAlt} aria-label="link" /> MyPlan</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" id="overlay2">
                    <div className="col-5" id="largeScreenDescription">
                        <p className="courseDesription">{props.courseItems.description}</p>
                    </div>
                    <div className="col-12 col-lg-4">
                        <LinearProgressBar
                            completed={props.courseItems.difficulty / 5 * 100}
                            content={difficulty}
                            text="课程难度" />
                        <LinearProgressBar
                            completed={props.courseItems.grading / 5 * 100}
                            content={grading}
                            text="评分难度" />
                        <LinearProgressBar
                            completed={props.courseItems.workload / 5 * 100}
                            content={workload}
                            text="作业量" />
                    </div>

                    <div className="col-12 col-lg-3" id="barCol">
                        <CircularProgressbarWithChildren value={props.courseItems.averageGPA / 4 * 100}>
                            <div className="gpaOverLay">
                                <p className="gpaValue">{props.courseItems.averageGPA}</p>
                                <p className="gpaLabel">平均成绩</p>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    <div className="col-12" id="smallScreenDescription">
                        <p className="courseDesription">{props.courseItems.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
