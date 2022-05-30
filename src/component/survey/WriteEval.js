import React, {useEffect, useState} from "react";
import SideHoverButtons from "../general/SideHoveringButtons";
import {NavLink} from "react-router-dom";
import "./WriteEval.css";
import {Input, Spinner} from "reactstrap";

// Autocomplete component for single-select (used in YouTube query page), using radio button
function AutoCompleteWithKeySingleSelect(props) {
    const [input, setInput] = useState("");
    const [matched, setMatched] = useState(props.dataObj);
    const [shouldShowSuggestion, setShouldShowSuggestion] = useState(false);

    function handleACInput(event) {
        event.preventDefault();
        setInput(event.target.value);
        if (event.target.value.trim().length === 0) {
            setMatched(props.dataObj);
        } else {
            refreshSuggestion(event.target.value);
            setShouldShowSuggestion(true);
        }
    }
    function onFocus(event) {if(input.length > 0) {setShouldShowSuggestion(true);}}

    function onBlur(event) {setShouldShowSuggestion(false);}

    function refreshSuggestion(value) {
        const inputValue = value.trim();
        const inputLength = inputValue.length;

        const pushedKey = [];
        // Limit the suggestion number on mobile phones
        let numSuggestion = window.innerWidth >= 576 ? 50 : 25;
        if (inputLength !== 0) {
            // First check start with, then check partial matching
            for (const oneKey of props.dataObj) {
                if (pushedKey.length >= numSuggestion) {
                    break; // Terminate for-loop early if we reach maximum number of suggestion
                } else if (oneKey.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    pushedKey.push(oneKey);
                }
            }
            if(pushedKey.length < numSuggestion) {
                for(const oneKey of props.dataObj) {
                    if (pushedKey.includes(oneKey)) {
                        continue;
                    } else if (oneKey.toLowerCase().includes(inputValue.toLowerCase())) {
                        pushedKey.push(oneKey);
                    }
                }
            }
        }

        // Control whether user can select its own input value (it's useful if we allow user add new item)
        if(props.useUserProvidedValue) {
            pushedKey.push(value);
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

    function handleClick(key) {
        props.setSelKey(key);
        setInput(key);
        setShouldShowSuggestion(false);
    }

    return (
        <div className="autocomplete_container">
            <input className="text_input" type="text" placeholder={props.placeholder} value={input} onChange={handleACInput} onFocus={onFocus} onBlur={onBlur}/>
            {shouldShowSuggestion ?
                <div className={"autocomplete_result_container"}>
                    {matched.map((oneKey) => (
                        <div key={oneKey} className="autocomplete_item" onClick={() => handleClick(oneKey)}>
                            <Input className={"autocomplete_item_input"} type="radio" id={oneKey} checked={props.selectedKey === oneKey} readOnly={true}/>
                            <span>&nbsp;</span>
                            <span>{oneKey}</span>
                        </div>
                    ))}
                </div> : ""}
        </div>
    );
}

function WriteEval(props) {
    // Extract course name from url parameter
    const params = (new URL(window.location)).searchParams;
    const courseNameParam = params.get("course_name") === null ? "" : params.get("course_name");
    const today = new Date();

    const [selCourseName, setSelCourseName] = useState(courseNameParam);
    const [allCourseName, setAllCourseName] = useState([]);
    const [selProfessor, setSelProfessor] = useState("");
    const [allProfessor, setAllProfessor] = useState([]);
    const [selClub, setSelClub] = useState("");
    const [allClub, setAllClub] = useState([]);

    const [selYear, setSelYear] = useState(today.getFullYear());
    const [selQuarter, setSelQuarter] = useState("");

    const [courseLoad, setCourseLoad] = useState("");
    const [grading, setGrading] = useState("");
    const [gpa, setGpa] = useState("");

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
                <div className={"course_basic_information_grid"}>
                    <div>
                        <span>年份</span>
                    </div>
                    <div>
                        <input type="number" min={2000} max={today.getFullYear()} value={selYear} onChange={(event)=>setSelYear(event.target.value)}/>
                    </div>
                    <div>
                        <span>学期</span>
                    </div>
                    <div>
                        <RadioButton value={"Au"} checked={selQuarter === "Au"} onChange={()=>setSelQuarter("Au")} displayValue="秋季学期 (Autumn)"/>
                        <RadioButton value={"Wi"} checked={selQuarter === "Wi"} onChange={()=>setSelQuarter("Wi")} displayValue="冬季学期 (Winter)"/>
                        <RadioButton value={"Sp"} checked={selQuarter === "Sp"} onChange={()=>setSelQuarter("Sp")} displayValue="春季学期 (Spring)"/>
                        <RadioButton value={"Su"} checked={selQuarter === "Su"} onChange={()=>setSelQuarter("Su")} displayValue="夏季学期 (Summer)"/>
                    </div>
                    <div>
                        <span>课程名称</span>
                    </div>
                    <div>
                        <AutoCompleteWithKeySingleSelect dataObj={allCourseName} selectedKey={selCourseName} setSelKey={setSelCourseName} placeholder={"请输入课程..."} useUserProvidedValue={false}/>
                    </div>
                    <div>
                        <span>授课讲师</span>
                    </div>
                    <div>
                        <AutoCompleteWithKeySingleSelect dataObj={allProfessor} selectedKey={selProfessor} setSelKey={setSelProfessor} placeholder={"请输入授课讲师..."} useUserProvidedValue={true}/>
                    </div>
                    <div>
                        <span>课程助教 (TA)</span>
                    </div>
                    <div>
                        <AutoCompleteWithKeySingleSelect dataObj={allProfessor} selectedKey={selProfessor} setSelKey={setSelProfessor} placeholder={"请输入授课讲师..."} useUserProvidedValue={true}/>
                    </div>
                </div>
                <div id="method-selection-q" className="form_title required-field">评价此课程</div>
                <div className={"course_basic_information_grid"}>
                    <div>
                        <span>课程任务量</span>
                    </div>
                    <div>
                        <div className={"horizontal_radio_button_container"}>
                            <RadioButton value={"1"} checked={courseLoad === "1"} onChange={()=>setCourseLoad("1")} displayValue="1（极少）"/>
                            <RadioButton value={"2"} checked={courseLoad === "2"} onChange={()=>setCourseLoad("2")} displayValue="2"/>
                            <RadioButton value={"3"} checked={courseLoad === "3"} onChange={()=>setCourseLoad("3")} displayValue="3（适中）"/>
                            <RadioButton value={"4"} checked={courseLoad === "4"} onChange={()=>setCourseLoad("4")} displayValue="4"/>
                            <RadioButton value={"5"} checked={courseLoad === "5"} onChange={()=>setCourseLoad("5")} displayValue="5（超多）"/>
                        </div>
                    </div>
                    <div>
                        <span>得分难易度</span>
                    </div>
                    <div>
                        <div className={"horizontal_radio_button_container"}>
                            <RadioButton value={"1"} checked={grading === "1"} onChange={()=>setGrading("1")} displayValue="1（容易）"/>
                            <RadioButton value={"2"} checked={grading === "2"} onChange={()=>setGrading("2")} displayValue="2"/>
                            <RadioButton value={"3"} checked={grading === "3"} onChange={()=>setGrading("3")} displayValue="3（适中）"/>
                            <RadioButton value={"4"} checked={grading === "4"} onChange={()=>setGrading("4")} displayValue="4"/>
                            <RadioButton value={"5"} checked={grading === "5"} onChange={()=>setGrading("5")} displayValue="5（困难）"/>
                        </div>
                    </div>
                </div>

                <span>你喜欢或者不喜欢此课程的哪些方面</span>

                <div id="method-selection-q" className="form_title required-field">介绍一下自己</div>
                <div>
                    <span>所属社团（可选项）</span>
                    <label><input type="radio" checked={selClub.length === 0} onChange={()=>setSelClub("")} readOnly={true}/>无</label>
                    <div>
                        <AutoCompleteWithKeySingleSelect dataObj={allClub} selectedKey={selClub} setSelKey={setSelClub} placeholder={"请输入所属社团..."} useUserProvidedValue={true}/>
                    </div>
                </div>
            </div>
        </div>);
}

function RadioButton({ value, checked, onChange, displayValue}){
    return (
        <div>
            <label>
                <input
                    value={value}
                    type="radio"
                    checked={checked}
                    onChange={onChange}
                    className="radio-btn"
                ></input>
                {displayValue}
            </label>
        </div>
    );
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