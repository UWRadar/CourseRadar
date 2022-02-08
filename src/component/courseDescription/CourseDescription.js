import React, { Component } from "react"
import Description from "./Description"
import Comments from "./Comments"
import "./Description.css"
import ServerConfig from "../config/ServerConfig"
import ReCAPTCHA from "react-google-recaptcha"

export default class CourseDescription extends Component {

    constructor(link) {
        super();
        this.state = {
            filteredComment: [],
            allComments: [],
            courseName: link["match"].params.courseName,
            courseInfo: {},
            receivedBackEndData: false
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            filteredComment: [],
            allComments: []
        });
        this.getCourseRatingByCoursename();
        if (this.captcha) {
            this.captcha.reset();
            this.captcha.execute();
        }
    }

    replaceNullWithZero(courseRating) {
        for (const [key, value] of Object.entries(courseRating)) {
            if (value == null)
                courseRating[key] = 0;
        }
    }

    getCourseRatingByCoursename() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETCOURSERATING + "?courseName=" + this.state.courseName)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    return {};
            })
            .then((data) => {
                if (data) {
                    console.log(data);
                    this.replaceNullWithZero(data.result[0])
                    this.setState({
                        courseInfo: data.result[0],
                        receivedBackEndData: true
                    })
                }
            })
    }

    getAllCommentFromCoursename(token) {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETCOMMENT + "?name=" +
                encodeURIComponent(this.state.courseName) + "&token=" + encodeURIComponent(token))
            .then((response) => {
                if (response.ok)
                    return response.json();
                else {
                    return [];
                }
            })
            .then(data => {
                this.setState({
                    allComments: data.result
                })
            })

    }

    onChange(token) {
        this.getAllCommentFromCoursename(token);
    }

    render() {

        const courseItems = {
            code: "PSYCH101",
            name: "Introduction to Psychology",
            credit: "5",
            desc: "Surveys major areas of psychological science. Core topics include human social behavior, personality, psychological disorders and treatment, learning, memory, human development, biological influences, and research methods.",
            tags: ["VLPA", "NW"]
        }
        return (
            <div className="coursedescription">
                {this.state.receivedBackEndData && <Description
                    courseItems={this.state.courseInfo}
                    courseName={this.state.courseName} />}
                <Comments commentItems={this.state.allComments} courseItems={this.state.courseInfo} />
                    {this.state.receivedBackEndData && <p className="commentTitle">课程评价</p>}

                    {this.state.receivedBackEndData && <Comments className="comments" comments={this.state.allComments}/>}
                <ReCAPTCHA
                        ref={(el) => {this.captcha = el;}}
                        sitekey="6LcxSdYdAAAAAGjridWu6qudV4YNcpUVraQmHZor"
                        size="invisible"
                        onChange={this.onChange}
                />
            </div>
        )
    }
}