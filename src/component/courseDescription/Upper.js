import React, { Component } from "react"
import "./Upper.css"

import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default class Upper extends Component {
    render() {
        return (
            <div className="hero">
                <Container>
                    <Row xs="2">
                        <Col>
                            <p className="courseCode">PSYCH101</p>
                            <p className="courseName">Introduction to Psychology</p>
                            <p className="myPlan">Link to MyPlan</p>
                        </Col>
                        <Col>
                            <div class="button star">
                                <Container>
                                    <Row xs="2"><Col>Difficulty： </Col><Col className="starIcon"><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /></Col></Row>
                                    <Row xs="2"><Col>Workload：   </Col><Col className="starIcon"><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /></Col></Row>
                                    <Row xs="2"><Col>Grading：</Col><Col className="starIcon"><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /></Col></Row>
                                    <Row xs="2"><Col>Avg.Grade:</Col><Col className="starIcon"><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /><FontAwesomeIcon icon={faStar} aria-label="Search" /></Col></Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="courseDesc">Surveys major areas of psychological science. Core topics include human social behavior, personality, psychological disorders and treatment, learning, memory, human development, biological influences, and research methods. Related topics may include sensation, perception, states of consciousness, thinking, intelligence, language, motivation, emotion, stress and health, cross-cultural psychology, and applied psychology.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div class="button credit">5 credits</div>{' '}
                            <div class="button type">NW</div>{' '}
                        </Col>
                    </Row>
                </Container>
                <br></br>
            </div>
        )
    }
}