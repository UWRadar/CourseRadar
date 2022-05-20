//import { Container, FormLabel } from "@material-ui/core"
import React, { Component } from "react"
import { Container, Row, Form, Button }from 'react-bootstrap'
import ServerConfig from "../config/ServerConfig"
import "./Feedback.css"
export default class Feedback extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    constructor(props) {
        super(props);

        this.state = {
          feedback : '',
          email : ''
        }
    }

    setFeedback = (e) => this.setState({ feedback: e.target.value });

    setEmail = (e) => this.setState({ email: e.target.value });

    convertStateToJSON() {
      return JSON.stringify({
          feedback : this.state.feedback,
          email : this.state.email
      })
  }

    async handleSubmit(event) {
      // use to prevent default validation UI
      let form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
      }
      event.preventDefault();
      this.setState({validated: true});
      if(!form.checkValidity()) {
          return;
      }
      const requestOptions = {
          method: 'POST',
          body: this.convertStateToJSON(),
      };
      console.log("url: " + ServerConfig.SERVER_URL + ServerConfig.FILLFEEDBACK + requestOptions)
      console.log("request body: " + requestOptions.body);
      console.log(JSON.parse(requestOptions.body))
      const response = await fetch(ServerConfig.SERVER_URL + ServerConfig.FILLFEEDBACK, requestOptions);
      const data = await response.json();
      console.log("data: " + data);
      if(data.success === true) {
          alert("反馈提交成功，感谢你的付出");
          window.location.href = "/";
      } else {
          alert(data.result + ", please try again");
      }
      //console.log(requestOptions);
      console.log(JSON.parse(requestOptions.body))
  }

    render() {
        return (
          <div className="container-xxl" id="survey">
          <Container id='feedback-header'>
              <h1>Feedback Form</h1>
          </Container>
          <Container>
              <Form noValidate className = 'feedback-form' validated={this.state.validated} onSubmit= {(e) => this.handleSubmit(e)}>
                  <Container id='form-box'>
                  <Form.Group as={Row} style={{margin: "auto"}} controlId='formFeedback'>
                      <Form.Label column sm={4} className="text-md-left">
                          Question:
                      </Form.Label>
                      <Form.Control
                          required
                          as="textarea"
                          rows={20}
                          value={this.state.feedback}
                          onChange={this.setFeedback}
                      />
                      <Form.Control.Feedback type="invalid">
                          Feedback is a required field.
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Row} style={{margin: "auto"}} controlId='formEmail'>
                      <Form.Label column sm={4} className="text-md-left">
                          If applicable, please provide your email for further feedback information:
                      </Form.Label>
                      <Form.Control
                          as="textarea"
                          rows={2}
                          value={this.state.email}
                          onChange={this.setEmail}
                      />
                  </Form.Group>
                  </Container>
                  <Container id="btn-box">
                      <Button variant="primary" type="submit" id="submit-btn" size="lg">
                          Submit
                      </Button>
                  </Container>
              </Form>
          </Container>
      </div>
        )
    }
}