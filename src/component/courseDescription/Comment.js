import React from "react"
import "./Comment.css"
import { Grid } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import logo from '../../img/hdlogo.png';

const Comment = (props) => {
    return (
        <div className="CourseComment">
            <Grid container xs={12}>
                <Grid item xs={2} className='logo'>
                    <img className='commentlogo' src={logo} alt="profile logo" />
                </Grid>
                <Grid item xs={10}>
                        <p className='name'>{props.name}</p>
                    <Row className='info'>
                        <Col xs={12} lg={3}>
                            <p className='question'>Quarter: </p><p className='answer'>{props.quarter}</p>
                        </Col>
                        <Col xs={12} lg={6}>
                            <p className='question'>Professor: </p><p className='answer'>{props.professor}</p>
                        </Col>
                        <Col xs={12} lg={3}>
                            <p className='question'>Grade: </p><p className='answer'>{props.gpa}</p>
                        </Col>
                    </Row>
                    <Row className='commentdetail'>
                        <p className='paragraph'>{props.comment}</p>
                    </Row>
                </Grid>
            </Grid>
        </div>   
    )
}

export default Comment