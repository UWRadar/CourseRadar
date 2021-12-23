import React, { component } from "react"
import ReactHover, { Trigger, Hover } from "react-hover";
import HoverComponent from "./HoverComponent";
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./Description.css"
import StarSmall from './StarSmall';
import { Container, Row, Col } from 'reactstrap';
import LinearProgressBar from "./LinearProgressBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import background from "../../img/guthrie.jpeg";



const Description = (props) => {
    console.log(props);
    const difficulty = Math.round(props.courseItems.difficulty * 10) / 10
    const grading = Math.round(props.courseItems.grading * 10) / 10
    const workload = Math.round(props.courseItems.workload * 10) / 10
    const handleClick = () => {
        window.location.href = "/"
    }



    const optionsCursorTrueWithMargin = {
        followCursor:true,
        shiftX:-700,
        shiftY:-500
  }

    return (
        <div>
            {/* <div className="description">
                <div className="hero" style={{backgroundImage: `url(${background})`}}>
                    <div className="overlay">
                        <Container>
                            <Row>
                                <Col>
                                    <p className="courseCode">{props.courseName}</p>
                                    <p className="courseName">{props.courseItems.courseFullName}</p>
                                    <a href={props.courseItems.myplanLink} className="myPlan"><FontAwesomeIcon icon={faExternalLinkAlt} aria-label="link" /> MyPlan</a>
                                </Col>
                                <Col>
                                    <p className="courseCredit">{props.courseItems.credit}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="courseDesc">{props.courseItems.description}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {props.courseItems.creditType.split("/").map(element => {
                                    return (<div ><div className="button type">{element}</div>{' '}</div>);})}
                                </Col>
                            </Row>
                        </Container>
                        <br></br>
                    </div>
                </div>
                <StarSmall
                    diffRating={props.courseItems.difficulty}
                    workRating={props.courseItems.workload}
                    avgRating={props.courseItems.averageGPA}
                /> */}

            {/* </div> */}


            <div className="container-fluid" style={{padding: 0}}>
                <div className="topHalf">
                    <div className="row" id="overlay">
                        <div className="col-12 col-lg-9 ">
                            <p className="courseCode">{props.courseName.toUpperCase()}</p>
                            <p className="courseName">{props.courseItems.courseFullName}</p>
                            <p className="courseCredit">{props.courseItems.credit + " credits"}</p>
                            {props.courseItems.creditType.split("/").map(element => {
                                        return (<div ><div className="button type">{element}</div>{' '}</div>);})}
                        </div>
                        <div className="col-12 col-lg-3" id="fillComment">
                            <div className="row">
                                <NavLink to="/survey">
                                    <button type="button" class="btn btn-primary" id="commentButton">填写课评</button>
                                </NavLink>
                                <a href={props.courseItems.myplanLink} className="myPlan"><FontAwesomeIcon icon={faExternalLinkAlt} aria-label="link" /> MyPlan</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={{marginTop: "3%", marginLeft: "0.5%"}}>
                    <div className="col-5" id="largeScreenDescription">
                        <p className="courseDesription">{props.courseItems.description}</p>
                    </div>             
                    <div className="col-12 col-lg-4">
                        <ReactHover options={optionsCursorTrueWithMargin}>
                            <Trigger type='trigger'>
                                <LinearProgressBar 
                                    completed={props.courseItems.difficulty / 5 * 100} 
                                    content={difficulty} 
                                    text="课程难度" />
                            </Trigger>
                            <Hover type='hover'>
                                <HoverComponent />
                            </Hover>
                        </ReactHover>
                            <LinearProgressBar 
                                completed={props.courseItems.grading / 5 * 100} 
                                content={grading} 
                                text="评分难度"/>
                            <LinearProgressBar 
                                completed={props.courseItems.workload / 5 * 100}
                                content={workload} 
                                text="作业量"/>
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
    )
}

export default Description