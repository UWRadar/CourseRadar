import React, { Component } from "react"
import "./StarLarge.css"
import StarRatings from 'react-star-ratings';
import { Container, Row, Col } from 'reactstrap';
import flag from '../../img/flag.svg';
import clock from '../../img/clock.svg';
import award from '../../img/award.svg';
import Button from '@material-ui/core/Button';
const StarLarge = (props) => {
    console.log(props)
    const handleClick = () => {
        window.location.href = "/survey"
    }
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
                        <Row xs="2"><Button variant="contained" size="large" id="button" onClick={handleClick}>提交更多课评</Button></Row>
                    </Container>
                    
                </div>
            </Col>
        </Row>
    </Container>
    )
    
}
export default StarLarge