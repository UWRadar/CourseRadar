import React, { Component } from "react"
import "./StarLarge.css"
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';

const StarLarge = (props) => {

    return (
        <Container className='ratingstar'> 
        <Row>
            <Col>
                <div >
                    <Container>
                        <Row xs="2"><Col className="cat">Difficulty: </Col><Col className='stars'><StarRatings classname='large' rating={props.diffRating} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                        <Row xs="2"><Col className="cat">Workload: </Col><Col className='stars'><StarRatings classname='large' rating={props.workRating} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                        <Row xs="2"><Col className="cat">Avg.GPA: </Col><Col className='stars'> <StarRatings classname='large' rating={props.avgRating} starDimension="12px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                        <br></br>
                    </Container>
                </div>
            </Col>
        </Row>
    </Container>
    )
    
}
export default StarLarge