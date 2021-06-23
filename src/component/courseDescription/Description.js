import React, { Component } from "react"
import "./Description.css"
import StarSmall from './StarSmall';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import background from "../../img/guthrie.jpeg";

const Description = (props) => {
    return (
        <div className="description">
            <div className="hero" style={{backgroundImage: `url(${background})`}}>
                <div className="overlay">
                    <Container>
                        <Row>
                            <Col>
                                <p className="courseCode">{props.courseItems.code}</p>
                                <p className="courseName">{props.courseItems.name}</p>
                                <p className="myPlan"><FontAwesomeIcon icon={faExternalLinkAlt} aria-label="link" /> MyPlan</p>
                            </Col>
                            <Col>
                                <p className="courseCredit">{props.courseItems.credit}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="courseDesc">{props.courseItems.desc}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {props.courseItems.tags.map(element => {
                                return (<div ><div className="button type">{element}</div>{' '}</div>);})}
                            </Col>
                        </Row>
                    </Container>
                    <br></br>
                </div>
            </div>
            <StarSmall/>
        </div>
        
    )
}

    export default Description