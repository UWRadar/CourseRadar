import React, { Component } from "react"
import "./StarLarge.css"
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';


export default class StarLarge extends Component {
    render() {
        return (
            <Container className='ratingstar'> 
            <Row>
                <Col>
                    <div >
                        <Container>
                            <Row xs="2"><Col className="cat">Difficulty: </Col><Col className='stars'><StarRatings classname='large' rating={5} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                            <Row xs="2"><Col className="cat">Workload: </Col><Col className='stars'><StarRatings classname='large' rating={5} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                            <Row xs="2"><Col className="cat">Grading: </Col><Col className='stars'> <StarRatings classname='large' rating={5} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                            <Row xs="2"><Col className="cat">Avg.Grade: </Col><Col className='stars'> <StarRatings classname='large' rating={4} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                            <br></br>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
        )
    }
}