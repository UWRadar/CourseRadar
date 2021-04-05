import React, { Component } from "react"
import "./Description.css"
import Star from './Star';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import background from "../../img/guthrie.jpeg";

export default class Description extends Component {
    render() {
        return (
            <div className="description">
                <div className="hero" style={{backgroundImage: `url(${background})`}}>
                    <div className="overlay">
                        <Container>
                            <Row xs="1">
                                <Col>
                                    <p className="courseCode">PSYCH101</p>
                                    <p className="courseName">Introduction to Psychology</p>
                                    <p className="myPlan"><FontAwesomeIcon icon={faExternalLinkAlt} aria-label="link" /> MyPlan</p>
                                </Col>
                                {/* <Col>
                                    <div className="button creditInfo">
                                        <Container>
                                            <Row xs="2"><Col>Credit： </Col><Col className="info">3</Col></Row>
                                            <Row xs="2"><Col>Type: </Col><Col className="info">I&S</Col></Row>
                                            <Row xs="1" className="myPlan"><Col>MyPlan Link</Col></Row>
                                        </Container>
                                    </div>
                                </Col> */}
                            </Row>
                            <Row>
                                <Col>
                                    <p className="courseDesc">Surveys major areas of psychological science. Core topics include human social behavior, personality, psychological disorders and treatment, learning, memory, human development, biological influences, and research methods.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="button credit">5 credits</div>{' '}
                                    <div className="button type">NW</div>{' '}
                                </Col>
                            </Row>
                        </Container>
                        <br></br>
                    </div>
                </div>
                <Star/>
            </div>
            
        )
    }
}