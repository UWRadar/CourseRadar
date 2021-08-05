//import { Container, FormLabel } from "@material-ui/core"
import React, { Component } from "react"
import { Container, Row, Col, Form, Button, Card }from 'react-bootstrap'
import "./SurveyPage.css"
import ImageManger from "../general/ImageManager"
import ServerConfig from "../config/ServerConfig"
export default class SurveyPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: '',
            quarter: '',
            courseName: '',
            instructor: '',
            credits: '',
            courseContent: '',
            workload: 1,
            difficulty: 1,
            comment: '',
            contact: '',
            gpa: '',
            language: 'Chinese',
            // use to prevent default validation UI
            validated: false,
        }
    }

    setYear = (e) => this.setState({ year: e.target.value });

    setCourseName = (e) => this.setState({ courseName: e.target.value });

    setInstructor = (e) => this.setState({ instructor: e.target.value });
    
    setCourseContent = (e) => this.setState({ courseContent: e.target.value });

    setComment = (e) => this.setState({ comment: e.target.value });
    
    setRemark = (e) => this.setState({ remark: e.target.value });

    setGPA = (e) => this.setState({gpa: e.target.value});

    setContact = (e) => this.setState({ contact: e.target.value });

    setQuarter = (e) => this.setState({ quarter: e.target.value });

    setWorkload = (e) => this.setState({ workload: e.target.value });

    setDifficulty = (e) => this.setState({ difficulty: e.target.value });

    convertStateToJSON() {
        return JSON.stringify({
            year: this.state.year,
            quarter: this.state.quarter,
            courseName: this.state.courseName,
            instructor: this.state.instructor,
            comment: this.state.courseContent + " " + this.state.comment,
            workload: this.state.workload,
            difficulty: this.state.difficulty,
            grading: this.state.gpa
        })
    }
    async handleSubmit(event) {
        // use to prevent default validation UI
        let form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        event.preventDefault();
        this.setState({validated: true});
        if(!form.checkValidity()) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            body: this.convertStateToJSON(),
        };
        console.log(ServerConfig.SERVER_URL + ServerConfig.FILLCOMMENT)
        const response = await fetch(ServerConfig.SERVER_URL + ServerConfig.FILLCOMMENT, requestOptions);
        const data = await response.json();
        console.log(data);
        if(data.success === true) {
            alert("课评提交成功，感谢你的付出");
            window.location.href = "/";
        } else {
            alert(data.result + ", please try again");
        }
        //console.log(requestOptions);
        //console.log(JSON.parse(requestOptions.body))
    }

    render() {
        window.scrollTo(0, 0);
        
        return (
            <div className="container-xxl" id="survey">
                <Container id='form-header'>
                    <h1>Course Evaluation Form</h1>
                </Container>
                <Container>
                    <Form noValidate className = 'survey-form' validated={this.state.validated} onSubmit= {(e) => this.handleSubmit(e)}>
                        <Container id='form-box'>
                        <Form.Group as={Row} controlid='formYear'>
                            <Form.Label column sm={2} className="text-md-left">
                                Year:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder="YYYY"
                                    value={this.state.year}
                                    onChange={this.setYear}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Year is a required field.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlID='formQuarter'>                                                
                            <Form.Label column sm={2} className="text-md-left">
                                Quarters:
                            </Form.Label>
                            <Col sm={2}>     
                                <Form.Control required="true" as="select" value={this.state.quarter} onChange={this.setQuarter}>
                                        <option value='spring'>Spring</option>
                                        <option value='summer'>Summer</option>
                                        <option value='autumn'>Autumn</option>
                                        <option value='winnter'>Winter</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                        Quarter is a required field.
                                </Form.Control.Feedback>
                            </Col>        
                        </Form.Group>
                        <Form.Group as={Row} controlId='formCourseName'>
                            <Form.Label column sm={2} className="text-md-left">
                                Course Name:
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder="e.g.: CSE142"
                                    value={this.state.courseName}
                                    onChange={this.setCourseName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    CourseName is a required field.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formInstructor'>
                            <Form.Label column sm={2} className="text-md-left">
                                Instructor:
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder="First Name, Last Name"
                                    value={this.state.instructor}
                                    onChange={this.setInstructor}
                                />
                                <Form.Control.Feedback type="invalid">
                                    instructor is a required field.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} controlId='formCourseContent'>
                            <Form.Label column sm={4} className="text-md-left">
                                Course Content
                            </Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                rows={3}
                                value={this.state.courseContent}
                                onChange={this.setCourseContent}
                            />
                            <Form.Control.Feedback type="invalid">
                                courseContent is a required field.
                            </Form.Control.Feedback>   
                        </Form.Group>
                        <Form.Group as={Row} controlId='formWorkload'>
                            <Form.Label column sm={2} className="text-md-left">
                                Workload:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control required="true" as="select" value={this.state.workload} onChange={this.setWorkload}>
                                    <option value='1'>1(Light)</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5(Massive)</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                    workload is a required field.
                            </Form.Control.Feedback>
                            </Col>
                            
                        </Form.Group>
                        <Form.Group as={Row} controlId='formGrading'>
                            <Form.Label column sm={2} className="text-md-left">
                                Difficulty:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control required="true" as="select" value={this.state.difficulty} onChange={this.setDifficulty}>
                                    <option value='1'>1(Easy)</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5(Hard)</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                        Difficulty is a required field.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='formGPA'>
                            <Form.Label column sm={2} className="text-md-left">
                                GPA:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    type='text'
                                    placeholder="eg. 3.3 (optional)"
                                    value={this.state.gpa}
                                    onChange={this.setGPA}
                                />
                                <Form.Control.Feedback type="invalid">
                                    gpa is a required field.
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId='formSurveyComment'>
                            <Form.Label column sm={4} className="text-md-left">
                                Comments and Additional Thought:
                            </Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                value={this.state.comment}
                                onChange={this.setComment}
                            />
                        </Form.Group>
                        <Form.Group as={Row} controlId='formSurveyRemark'>
                            <Form.Label column sm={2} className="text-md-left">
                                备注（姓名或所属社团名称）:
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    type='text'
                                    placeholder="Optional"
                                    value={this.state.remark}
                                    onChange={this.setRemark}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formSurveyContact'>
                            <Form.Label column sm={2} className="text-md-left">
                                Contact(E-mail or Wechat):
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    type='text'
                                    placeholder="Optional"
                                    value={this.state.contact}
                                    onChange={this.setContact}
                                />
                            </Col>
                        </Form.Group>
                        </Container>
                        <Container id="btn-box">
                            <Button variant="primary" type="submit" id="submit-btn" size="lg">
                                Submit
                            </Button>
                        </Container>
                    </Form>            
                </Container>
            </div>
        )
    }
}