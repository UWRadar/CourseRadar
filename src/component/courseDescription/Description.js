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
            redirect: false,
            mustList: [],
            oneList: []
        }
    }

    difficulty = Math.round(this.props.courseItems.difficulty * 10) / 10
    grading = Math.round(this.props.courseItems.grading * 10) / 10
    workload = Math.round(this.props.courseItems.workload * 10) / 10
    // const handleClick = () => {
    //     window.location.href = "/"
    // }

    
    extractClass(str_list) {
        let res_list = []
        for (var i = 0; i < str_list.length; i++) {
            let res = ""
            let foundUpperCase = false
            let str = str_list[i]
            for (var j = 0; j < str.length; j++) {
                if (str.charAt(j) >= 'A' && str.charAt(j) <= 'Z') {
                    foundUpperCase = true
                    res += str.charAt(j)
                }
                if (foundUpperCase && str.charAt(j) >= '0' && str.charAt(j) <= '9') {
                    res += str.charAt(j)
                }
            }
            res_list.push(res)
        }
        return res_list
    }

    mustTakeList = []
    selectOneList = []

    parseDescription() {
        if (this.props.courseItems.description.indexOf("may not be taken") !== -1) {
            return
        }
        let start = this.props.courseItems.description.indexOf("Prerequisite") === -1 ? -1 : this.props.courseItems.description.indexOf("Prerequisite") + 14
        if (start === -1) {
            return
        }
        let end = this.props.courseItems.description.indexOf("Offered") === -1 ? this.props.courseItems.description.lastIndexOf(".") : this.props.courseItems.description.indexOf("Offered") - 1
        
        let prereq = this.props.courseItems.description.substring(start, end)
        if (prereq.indexOf("recommended") !== -1) {
            prereq = prereq.substring(0, prereq.indexOf("recommended"))
        }
        prereq.trim()
        
        let breakPoint = prereq.indexOf("Either") === -1 ? prereq.indexOf("either") : prereq.indexOf("Either")
        let mustTake = ""
        let selectOne = ""
        if (breakPoint !== -1) {
            mustTake = prereq.substring(0, breakPoint - 2)
            selectOne = prereq.substring(breakPoint + 7)
        } else {
            mustTake = prereq
        }
        
        this.mustTakeList = mustTake.split(", ")
        let selectOneList_before = selectOne.split("either")
        for (var k = 0; k < selectOneList_before.length; k++) {
            let curr_classes = selectOneList_before[k].split(", ")
            this.selectOneList = this.selectOneList.concat(curr_classes)
        }
        

        if (this.mustTakeList.length !== 0) {
            for (var i = 0; i < this.mustTakeList.length; i++) {
                if (this.mustTakeList[i].indexOf(" or ") !== -1) {
                    let two_classes = this.mustTakeList[i].split(" or ")
                    let class_list = this.extractClass(two_classes)
                    this.mustTakeList.splice(i, 1)
                    i--
                    this.mustTakeList = this.mustTakeList.concat(class_list)
                } else if (this.mustTakeList[i].indexOf("/") !== -1) {
                    let many_classes = this.mustTakeList[i].split("/")
                    this.mustTakeList.splice(i, 1)
                    i--
                    this.mustTakeList = this.mustTakeList.concat(many_classes)
                } else if (this.mustTakeList[i].indexOf("&") !== -1) {
                    let two_classes = this.mustTakeList[i].split("&")
                    let class_list = this.extractClass(two_classes)
                    let class_num = ""
                    for (var j = 0; j < class_list[1].length; j++) {
                        if (class_list[1].charAt(j) >= '0' && class_list[1].charAt(j) <= '9') {
                            class_num += class_list[1].charAt(j)
                        }
                    }
                    class_list[0] += class_num
                    this.mustTakeList.splice(i, 1)
                    i--
                    this.mustTakeList = this.mustTakeList.concat(class_list)
                } else if (this.mustTakeList[i].indexOf("and") !== -1) {
                    let two_classes = this.mustTakeList[i].split("and")
                    let class_list = this.extractClass(two_classes)
                    this.mustTakeList.splice(i, 1)
                    i--
                    this.mustTakeList = this.mustTakeList.concat(class_list)
                } else {
                    let class_list = this.extractClass([this.mustTakeList[i]])
                    this.mustTakeList[i] = class_list[0]
                }
            }
        }

        if (this.selectOneList.length !== 0) {
            for (i = 0; i < this.selectOneList.length; i++) {
                if (this.selectOneList[i].indexOf(" or ") !== -1) {
                    let two_classes = this.selectOneList[i].split(" or ")
                    let class_list = this.extractClass(two_classes)
                    this.selectOneList.splice(i, 1)
                    i--
                    this.selectOneList = this.selectOneList.concat(class_list)
                } else if (this.selectOneList[i].indexOf("/") !== -1) {
                    let many_classes = this.selectOneList[i].split("/")
                    this.selectOneList.splice(i, 1)
                    i--
                    this.selectOneList = this.selectOneList.concat(many_classes)
                } else if (this.selectOneList[i].indexOf("&") !== -1) {
                    let two_classes = this.selectOneList[i].split("&")
                    let class_list = this.extractClass(two_classes)
                    let class_num = ""
                    for (var j = 0; j < class_list[1].length; j++) {
                        if (class_list[1].charAt(j) >= '0' && class_list[1].charAt(j) <= '9') {
                            class_num += class_list[1].charAt(j)
                        }
                    }
                    class_list[0] += class_num
                    this.selectOneList.splice(i, 1)
                    i--
                    this.selectOneList = this.selectOneList.concat(class_list)
                } else if (this.selectOneList[i].indexOf("and") !== -1) {
                    let two_classes = this.selectOneList[i].split("and")
                    let class_list = this.extractClass(two_classes)
                    this.selectOneList.splice(i, 1)
                    i--
                    this.selectOneList = this.selectOneList.concat(class_list)
                } else {
                    let class_list = this.extractClass([this.selectOneList[i]])
                    this.selectOneList[i] = class_list[0]
                }
            }
        }

        if (this.mustTakeList[0] === "") {
            this.mustTakeList.pop()
        }
        if (this.selectOneList[0] === "") {
            this.selectOneList.pop()
        }

        this.setState({
            mustList: this.mustTakeList,
            oneList: this.selectOneList
        })

        console.log(this.mustTakeList.sort((a, b) => a.localeCompare(b)))
        console.log(this.selectOneList.sort((a, b) => a.localeCompare(b)))
    }

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
        this.parseDescription()
    }

    togglePop = () => {
        this.setState({
         pop: !this.state.pop
        });
    };

    handleCommentClick = () => {
        if (!this.state.isLoggedIn) {
            this.setState({
                redirect: false
            })
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
                                {this.state.mustList.map(element => {
                                            return (<div ><div className="button type">{element}</div>{' '}</div>);})}
                                {this.state.oneList.map(element => {
                                            return (<div ><div className="button type">{element}*</div>{' '}</div>);})}
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