import React, { Component } from "react"
import "./StarLarge.css"
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';
import flag from '../../img/flag.svg';
import clock from '../../img/clock.svg';
import award from '../../img/award.svg';

const StarLarge = (props) => {
    console.log(props)
    return (
        <Container className='ratingstar'> 
        <Row>
            <Col>
                <div >
                    <Container>
                        <Row xs="2"><Col className="cat"><img src={flag} className="icon" alt="flag" /> <span> </span>Difficulty<span> </span>: </Col><Col className='stars'><StarRatings classname='large' rating={props.diffRating} starDimension="16px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                        <Row xs="2"><Col className="cat"><img src={clock} className="icon" alt="clock" /><span> </span>Workload<span> </span>: </Col><Col className='stars'><StarRatings classname='large' rating={props.workRating} starDimension="16px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                        <Row xs="2"><Col className="cat"><img src={award} className="icon" alt="award" /><span> </span>Avg.GPA<span> </span>: </Col><Col className='stars'> <StarRatings classname='large' rating={props.avgRating} starDimension="16px" starRatedColor="rgb(230, 178, 84)" starSpacing="0.7px"/></Col></Row>
                        <br></br>
                    </Container>
                </div>
            </Col>
        </Row>
    </Container>
    )
    
}
export default StarLarge