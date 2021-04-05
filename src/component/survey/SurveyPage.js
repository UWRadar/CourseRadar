//import { Container, FormLabel } from "@material-ui/core"
import React, { Component } from "react"
import { Container, Row, Col, Form, Button, Card }from 'react-bootstrap'
import "./SurveyPage.css"
import ImageManger from "../general/ImageManager"
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
            workload: '',
            grading: '',
            comment: '',
            remark: '',
            contact: '',
        }
    }

    setYear = (e) => this.setState({ year: e.target.value });

    setCourseName = (e) => this.setState({ courseName: e.target.value });

    setInstructor = (e) => this.setState({ instructor: e.target.value });
    
    setCourseContent = (e) => this.setState({ courseContent: e.target.value });

    setComment = (e) => this.setState({ comment: e.target.value });
    
    setRemark = (e) => this.setState({ remark: e.target.value });

    setContact = (e) => this.setState({ contact: e.target.value });

    setCredits = (e) => this.setState({ credits: e.target.value });

    setQuarter = (e) => this.setState({ quarter: e.target.value });

    setWorkload = (e) => this.setState({ workload: e.target.value });

    setGrading = (e) => this.setState({ grading: e.target.value });

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <Container maxWidth="lg" fliud>
                <Container id='form-header'>
                    <h1>Course Evaluation Form</h1>
                </Container>
                <Container>
                    <Form className = 'survey-form' onSubmit= {(e) => this.handleSubmit(e)}>
                        <Container id='form-box'>
                        <Form.Group as={Row} controlId='formYear'>
                            <Form.Label column sm={2} className="text-md-left">
                                Year:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control
                                    type='text'
                                    placeholder="YYYY"
                                    value={this.state.year}
                                    onChange={this.setYear}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlID='formQuarter'>
                            <Form.Label column sm={2} className="text-md-left">
                                Quarters:
                            </Form.Label>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='Autumn' 
                                    name='quarterSelect'
                                    value='autumn' 
                                    checked={this.state.quarter === 'autumn'}
                                    onChange={this.setQuarter}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='Winter' 
                                    name='quarterSelect'
                                    value='winter' 
                                    checked={this.state.quarter === 'winter'}
                                    onChange={this.setQuarter}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='Spring' 
                                    name='quarterSelect'
                                    value='spring' 
                                    checked={this.state.quarter === 'spring'}
                                    onChange={this.setQuarter}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='Summer' 
                                    name='quarterSelect'
                                    value='summer' 
                                    checked={this.state.quarter === 'summer'}
                                    onChange={this.setQuarter}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formCourseName'>
                            <Form.Label column sm={2} className="text-md-left">
                                Course Name:
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    type='text'
                                    placeholder="e.g.: CSE142"
                                    value={this.state.courseName}
                                    onChange={this.setCourseName}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formInstructor'>
                            <Form.Label column sm={2} className="text-md-left">
                                Instructor:
                            </Form.Label>
                            <Col sm={3}>
                                <Form.Control
                                    type='text'
                                    placeholder="First Name, Last Name"
                                    value={this.state.instructor}
                                    onChange={this.setInstructor}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formCredits'>
                            <Form.Label column sm={2} className="text-md-left">
                                Credits:
                            </Form.Label>
                            <Col sm={2}>
                                <Form.Control as="select" value={this.state.credits} onChange={this.setCredits}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='3'>4</option>
                                    <option value='5'>5</option>
                            </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formCourseContent'>
                            <Form.Label column sm={4} className="text-md-left">
                                Course Content
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={this.state.courseContent}
                                onChange={this.setCourseContent}
                            />
                        </Form.Group>
                        <Form.Group as={Row} controlId='formWorkload'>
                            <Form.Label column sm={2} className="text-md-left">
                                Workload:
                            </Form.Label>
                            <Col sm>
                                <Form.Text>Light</Form.Text>
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='1' 
                                    name='WorkloadSelect'
                                    value='1' 
                                    checked={this.state.workload === '1'}
                                    onChange={this.setWorkload}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='2' 
                                    name='WorkloadSelect'
                                    value='2' 
                                    checked={this.state.workload === '2'}
                                    onChange={this.setWorkload}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='3' 
                                    name='WorkloadSelect'
                                    value='3' 
                                    checked={this.state.workload === '3'}
                                    onChange={this.setWorkload}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='4' 
                                    name='WorkloadSelect'
                                    value='4' 
                                    checked={this.state.workload === '4'}
                                    onChange={this.setWorkload}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='5' 
                                    name='WorkloadSelect'
                                    value='5' 
                                    checked={this.state.workload === '5'}
                                    onChange={this.setWorkload}
                                />
                            </Col>
                            <Col sm>
                                <Form.Text>Massive</Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId='formGrading'>
                            <Form.Label column sm={2} className="text-md-left">
                                Workload:
                            </Form.Label>
                            <Col sm>
                                <Form.Text>Easy</Form.Text>
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='1' 
                                    name='GradingSelect'
                                    value='1' 
                                    checked={this.state.grading === '1'}
                                    onChange={this.setGrading}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='2' 
                                    name='GradingSelect'
                                    value='2' 
                                    checked={this.state.grading === '2'}
                                    onChange={this.setGrading}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='3' 
                                    name='GradingSelect'
                                    value='3' 
                                    checked={this.state.grading === '3'}
                                    onChange={this.setGrading}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='4' 
                                    name='GradingSelect'
                                    value='4' 
                                    checked={this.state.grading === '4'}
                                    onChange={this.setGrading}
                                />
                            </Col>
                            <Col sm>
                                <Form.Check
                                    inline
                                    type='radio'
                                    label='5' 
                                    name='GradingSelect'
                                    value='5' 
                                    checked={this.state.grading === '5'}
                                    onChange={this.setGrading}
                                />
                            </Col>
                            <Col sm>
                                <Form.Text>Hard</Form.Text>
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
                        <Form.Group as={Row} controlId='formSurveyRemark'>
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
            </Container>
        )
    }
}