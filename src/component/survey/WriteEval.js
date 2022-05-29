import React, {useEffect, useState} from "react";
import SideHoverButtons from "../general/SideHoveringButtons";
import {NavLink} from "react-router-dom";
import "./WriteEval.css";
import {Input, Spinner} from "reactstrap";

// Autocomplete component for single-select (used in YouTube query page), using radio button
function AutoCompleteWithKeySingleSelect(props) {
    const [input, setInput] = useState("");
    const [matched, setMatched] = useState(props.dataObj);

    function handleACInput(event) {
        event.preventDefault();
        setInput(event.target.value);
        if (event.target.value.trim().length === 0) {
            setMatched(props.dataObj);
        } else {
            refreshSuggestion(event.target.value);
        }
    }
    function refreshSuggestion(value) {
        const inputValue = value.trim();
        const inputLength = inputValue.length;

        const pushedKey = [];
        // Limit the suggestion number on mobile phones
        let numSuggestion = window.innerWidth >= 576 ? 10 : 5;
        let counter = 0;
        if (inputLength !== 0) {
            // If user types alphanumeric character (cse143), check for start with result
            if (!isNaN(parseInt(inputValue))) {
                for (const oneKey of props.dataObj) {
                    if (counter >= numSuggestion) {
                        break; // Terminate for-loop early if we reach maximum number of suggestion
                    } else if (oneKey.toLowerCase().startsWith(inputValue.toLowerCase())) {
                        counter = counter + 1;
                        pushedKey.push(oneKey);
                    }
                }
            }
            // If user types just numeric character (142), check for partial matching
            else {
                // then, check whether user's input contains the actual language/region value
                for (const oneKey of props.dataObj) {
                    if (counter >= numSuggestion) {
                        break;
                    } else if (pushedKey.includes(oneKey)) {
                        continue;
                    } else if (
                        props.dataObj.toLowerCase().includes(inputValue.toLowerCase())
                    ) {
                        counter = counter + 1;
                        pushedKey.push(oneKey);
                    }
                }
            }
        }
        setMatched(pushedKey);
    }

    // Listen to source object change
    useEffect(() => {
        if (input.trim().length > 0) {
            refreshSuggestion(input);
        } else {
            setMatched(props.dataObj);
        }
    }, [props.dataObj]);

    return (
        <div className="autocomplete_container">
            <input className="text_input" type="text" placeholder={props.placeholder} value={input} onChange={handleACInput}/>
            <div className="autocomplete_result_container">
                {matched.map((key) => (
                    <div key={key} className="autocomplete_item" onClick={() => props.setSelKey(key)}>
                        <Input type="radio" id={key} checked={props.selectedKey === key} readOnly/>
                        <span>&nbsp;</span>
                        <span>{key}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

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

    if (allCourseName.length === 0 || allProfessor.length === 0 || allClub.length === 0) {
        return (
            <div className="container-fluid" id="outerCotainer">
                <div className="col" id="description">
                    <div className="container-fluid" style={{padding: 0}}>
                        <SideHoverButtons/>
                        <div className="topHalf">
                            <div className="row min_height" id="overlay">
                                <p className="eval_title">填写课评</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="eval_form_container">
                    <Spinner>Loading...</Spinner>
                    <div>加载中...</div>
                </div>
            </div>
        );
    }

    const today = new Date();

    return(
        <div className="container-fluid" id="outerCotainer">
            <div className="col" id="description">
                <div className="container-fluid" style={{padding: 0}}>
                    <SideHoverButtons/>
                    <div className="topHalf">
                        <div className="row min_height" id="overlay">
                            <p className="eval_title">填写课评</p>
                        </div>
                    </div>
                </div>
             </div>
            <div className="eval_form_container">
                <div id="method-selection-q" className="form_title required-field">
                    课程基本信息
                </div>
                <div>
                    <span>所上的学期：</span><input type="number" min="2000" max={today.getFullYear()} value={today.getFullYear()}/><span>年的</span>
                    <select>
                        <option value="Au">秋季学期 (Autumn)</option>
                        <option value="Wi">冬季学期 (Winter)</option>
                        <option value="Sp">春季学期 (Spring)</option>
                        <option value="Su">夏季学期 (Summer)</option>
                    </select>
                </div>
                <div>
                    <span>课程名称</span>
                    <AutoCompleteWithKeySingleSelect dataObj={allCourseName} selectedKey={selCourseName} setSelKey={setSelCourseName}/>
                </div>
                <div>
                    <span>授课讲师</span>
                </div>
                <div>
                    <span>课程助教 (TA)</span>
                    <label><input value={"无"} type="radio" checked={false}/>无</label>
                </div>
                <div className="method-selection-radio-buttons">

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