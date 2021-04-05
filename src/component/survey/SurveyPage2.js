import { Container } from "@material-ui/core"
import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Form, Button }from 'react-bootstrap'
//import "./SurveyPage.css"
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
            <Container maxWidth="lg">
                <div>
                    <h1>Course Evaluation Form</h1>
                </div>
                <form className = 'survey-form' onSubmit= {(e) => this.handleSubmit(e)}>
                    <div id='survey-year' className='survey-form-control'>
                        <label>Year:</label>
                        <input 
                            type='text'
                            placeholder='YYYY'
                            value={this.state.year}
                            onChange={this.setYear}
                        />
                    </div>
                    <div id='survey-quarter' className='survey-form-control'>
                        <label>Quarter:</label>
                        <label>
                            <input 
                                type='radio' 
                                name='quarterSelect'
                                value='autumn' 
                                checked={this.state.quarter === 'autumn'}
                                onChange={this.setQuarter}
                                />
                            Autumn
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='quarterSelect'
                                value='winter' 
                                checked={this.state.quarter === 'winter'}
                                onChange={this.setQuarter}
                                />
                            Winter
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='quarterSelect'
                                value='spring' 
                                checked={this.state.quarter === 'spring'}
                                onChange={this.setQuarter}
                                />
                            Spring
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='quarterSelect'
                                value='summer' 
                                checked={this.state.quarter === 'summer'}
                                onChange={this.setQuarter}
                                />
                            Summer
                        </label>
                    </div>
                    <div id='survey-course-name' className='survey-form-control'>
                        <label>Course Name:</label>
                        <input
                            type='text'
                            placeholder="e.g.: CSE142"
                            value={this.state.courseName}
                            onChange={this.setCourseName}
                        />
                    </div>
                    <div id='survey-instructor' className='survey-form-control'>
                        <label>Instructor:</label>
                        <input 
                            type='text'
                            placeholder='First Name, Last Name'
                            value={this.state.instructor}
                            onChange={this.setInstructor}
                        />
                    </div>
                    <div id='survey-credits' className='survey-form-control'>
                        <label>
                            Credits:
                            <select value={this.state.credits} onChange={this.setCredits}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='3'>4</option>
                                <option value='5'>5</option>
                            </select>
                        </label>
                    </div>
                    <div id='survey-course-content' className='survey-form-control'>
                        <label>Course Content</label>
                        <input 
                            type='text' 
                            placeholder=''
                            value={this.state.courseContent}
                            onChange={this.setCourseContent}
                        />
                    </div>
                    <div id='survey-workload' className='survey-form-control'>
                        <label>Workload:</label>
                        <label>
                            <input 
                                type='radio' 
                                name='WorkloadSelect'
                                value='1' 
                                checked={this.state.workload === '1'}
                                onChange={this.setWorkload}
                                />
                            1
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='WorkloadSelect'
                                value='2' 
                                checked={this.state.workload === '2'}
                                onChange={this.setWorkload}
                                />
                            2
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='WorkloadSelect'
                                value='3' 
                                checked={this.state.workload === '3'}
                                onChange={this.setWorkload}
                                />
                            3
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='WorkloadSelect'
                                value='4' 
                                checked={this.state.workload === '4'}
                                onChange={this.setWorkload}
                                />
                            4
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='WorkloadSelect'
                                value='5' 
                                checked={this.state.workload === '5'}
                                onChange={this.setWorkload}
                                />
                            5
                        </label>
                    </div>
                    <div id='survey-grading' className='survey-form-control'>
                        <label>Grading Techniques:</label>
                        <label>
                            <input 
                                type='radio' 
                                name='GradingSelect'
                                value='1' 
                                checked={this.state.grading === '1'}
                                onChange={this.setGrading}
                                />
                            1
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='GradingSelect'
                                value='2' 
                                checked={this.state.grading === '2'}
                                onChange={this.setGrading}
                                />
                            2
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='GradingSelect'
                                value='3' 
                                checked={this.state.grading === '3'}
                                onChange={this.setGrading}
                                />
                            3
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='GradingSelect'
                                value='4' 
                                checked={this.state.grading === '4'}
                                onChange={this.setGrading}
                                />
                            4
                        </label>
                        <label>
                            <input 
                                type='radio' 
                                name='GradingSelect'
                                value='5' 
                                checked={this.state.grading === '5'}
                                onChange={this.setGrading}
                                />
                            5
                        </label>
                    </div>
                    <div id='survey-comment' className='survey-form-control'>
                        <label>Comments and Additional Thought:</label>
                        <input 
                            type='text' 
                            placeholder=''
                            value={this.state.comment}
                            onChange={this.setComment}
                        />
                    </div>
                    <div id='survey-remark' className='survey-form-control'>
                        <label>备注(姓名或所属社团名称):</label>
                        <input 
                            type='text' 
                            placeholder='Optional' 
                            value={this.state.remark}
                            onChange={this.setRemark}
                        />
                    </div>
                    <div id='survey-contact' className='survey-form-control'>
                        <label>Contact(E-mail or Wechat):</label>
                        <input 
                            type='text' 
                            placeholder='Optional' 
                            value={this.state.contact}
                            onChange={this.setContact}
                        />
                    </div>
                    <input type='submit' value='Submit' id='form-submit-btn' className='btn' />
                </form>
            </Container>
        )
    }
}