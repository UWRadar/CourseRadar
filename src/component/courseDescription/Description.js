import React, { Component } from "react"
import "./Description.css"
import StarSmall from './StarSmall';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import background from "../../img/guthrie.jpeg";

const Description = (props) => {
    console.log(props);
    return (
        <div className="description">
            <div className="hero" style={{backgroundImage: `url(${background})`}}>
                <div className="overlay">
                    <Container>
                        <Row>
                            <Col>
                                <p className="courseCode">{props.courseName}</p>
                                <p className="courseName">{props.courseName}</p>
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
            />
        </div>

    )
}

    export default Description