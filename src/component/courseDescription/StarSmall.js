import React, { Component } from "react"
import "./StarSmall.css"
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';


export default class StarSmall extends Component {
    render() {
        return (
            <div className="rating">
                <Container>
                    <Row>
                        <Col>
                            <div >
                                <Container>
                                    <Row xs="2"><Col className="ratingCat">Difficulty: </Col><Col><StarRatings classname='small' rating={5} starDimension="15px" starRatedColor="rgb(230, 178, 84)" starSpacing="1px"/></Col></Row>
                                    <Row xs="2"><Col className="ratingCat">Workload: </Col><Col><StarRatings classname='small' rating={5} starDimension="15px" starRatedColor="rgb(230, 178, 84)" starSpacing="1px"/></Col></Row>
                                    <Row xs="2"><Col className="ratingCat">Grading: </Col><Col> <StarRatings classname='small' rating={5} starDimension="15px" starRatedColor="rgb(230, 178, 84)" starSpacing="1px"/></Col></Row>
                                    <Row xs="2"><Col className="ratingCat">Avg.Grade: </Col><Col> <StarRatings classname='small' rating={4} starDimension="15px" starRatedColor="rgb(230, 178, 84)" starSpacing="1px"/></Col></Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}