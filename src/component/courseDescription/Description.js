import React, { Component } from "react"
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./Description.css"
import StarSmall from './StarSmall';
import { Container, Row, Col } from 'reactstrap';
import LinearProgressBar from "./LinearProgressBar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { NavLink, Redirect } from 'react-router-dom'
import background from "../../img/guthrie.jpeg";
import SideHoverButtons from "../general/SideHoveringButtons"
import PopUp from "./PopUp"
import ServerConfig from "../config/ServerConfig"


export default class Description extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            pop: false,
            redirect: false
        }
    }

    difficulty = Math.round(this.props.courseItems.difficulty * 10) / 10
    grading = Math.round(this.props.courseItems.grading * 10) / 10
    workload = Math.round(this.props.courseItems.workload * 10) / 10
    // const handleClick = () => {
    //     window.location.href = "/"
    // }

    getUserInfo() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETUSERINFO)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        isLoggedIn: true
                    })
                }
            })
    }

    componentDidMount() {
        this.getUserInfo()
    }

    togglePop = () => {
        this.setState({
         pop: !this.state.pop
        });
    };

    handleCommentClick = () => {
        if (!this.state.isLoggedIn) {
            this.togglePop()
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
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
                    <SideHoverButtons/>
                    <div className="topHalf">
                        <div className="row" id="overlay">
                            <div className="col-12 col-lg-9 ">
                                <p className="courseCode">{this.props.courseName.toUpperCase()}</p>
                                <p className="courseName">{this.props.courseItems.courseFullName}</p>
                                <p className="courseCredit">{this.props.courseItems.credit + " credits"}</p>
                                {this.props.courseItems.creditType.split("/").map(element => {
                                            return (<div ><div className="button type">{element}</div>{' '}</div>);})}
                            </div>
                            <div className="col-12 col-lg-3" id="fillComment">
                                <div className="row">
                                    <button onClick={this.handleCommentClick} type="button" class="btn btn-primary" id="commentButton">填写课评</button>
                                    {this.state.pop ? <PopUp toggle={this.togglePop} /> : null}
                                    {this.state.redirect ? <Redirect to="/survey">abc</Redirect> : null}
                                    <a href={this.props.courseItems.myplanLink} className="myPlan"><FontAwesomeIcon icon={faExternalLinkAlt} aria-label="link" /> MyPlan</a>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="row" style={{marginTop: "3%", marginLeft: "0.5%"}}>
                        <div className="col-5" id="largeScreenDescription">
                            <p className="courseDesription">{this.props.courseItems.description}</p>
                        </div>             
                        <div className="col-12 col-lg-4">
                            <LinearProgressBar 
                                completed={this.props.courseItems.difficulty / 5 * 100} 
                                content={this.difficulty} 
                                text="课程难度" />
                            <LinearProgressBar 
                                completed={this.props.courseItems.grading / 5 * 100} 
                                content={this.grading} 
                                text="评分难度"/>
                            <LinearProgressBar 
                                completed={this.props.courseItems.workload / 5 * 100}
                                content={this.workload} 
                                text="作业量"/>
                        </div>
    
                        <div className="col-12 col-lg-3" id="barCol">
                            <CircularProgressbarWithChildren value={this.props.courseItems.averageGPA / 4 * 100}>
                                <div className="gpaOverLay">
                                    <p className="gpaValue">{this.props.courseItems.averageGPA}</p>
                                    <p className="gpaLabel">平均成绩</p>
                                </div>
                            </CircularProgressbarWithChildren>
                            
                        </div>
    
                        
                        
                        <div className="col-12" id="smallScreenDescription">
                                <p className="courseDesription">{this.props.courseItems.description}</p>   
                        </div>
                </div>
    
                
                
            </div>
    
        </div>
        )
    } 
}