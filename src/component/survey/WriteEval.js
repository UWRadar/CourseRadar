import React, {useEffect, useState} from "react";
import SideHoverButtons from "../general/SideHoveringButtons";
import {NavLink} from "react-router-dom";
import "./WriteEval.css";

function WriteEval(props) {
    // Extract course name from url parameter
    const params = (new URL(window.location)).searchParams;
    const courseNameParam = params.get("course_name") === null ? "" : params.get("course_name");

    const [selCourseName, setSelCourseName] = useState(courseNameParam);
    const [allCourseName, setAllCourseName] = useState([]);
    const [selProfessor, setSelProfessor] = useState("");
    const [allProfessor, setAllProfessor] = useState([]);
    const [selClub, setSelClub] = useState("");
    const [allClub, setAllClub] = useState([]);

    useEffect(()=>{
        fetchCourseName(setAllCourseName);
        fetchProfessor(setAllProfessor);
        fetchClubList(setAllClub);
    }, []);

    return(
        <div className="container-fluid" id="outerCotainer">
            <div className="col" id="description">
                <div className="container-fluid" style={{padding: 0}}>
                    <SideHoverButtons/>
                    <div className="topHalf">
                        <div className="row min_height" id="overlay">
                            <p className="courseCode">填写课评</p>
                        </div>
                    </div>
                </div>
             </div>
        </div>);
}

async function fetchCourseName(setCourseName) {
    const response = await fetch("http://localhost:10240/courses");
    const json = await response.json();
    setCourseName(json);
}

async function fetchProfessor(setProfessor) {
    const response = await fetch("http://localhost:10240/professors");
    const json = await response.json();
    setProfessor(json);
}

async function fetchClubList(setAllClub) {
    const response = await fetch("http://localhost:10240/clubs");
    const json = await response.json();
    setAllClub(json);
}

export default WriteEval;