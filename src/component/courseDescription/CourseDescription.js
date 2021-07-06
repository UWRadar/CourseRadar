import React, { Component } from "react"
import Description from "./Description"
import Comments from "./Comments"
import "./Description.css"
import ServerConfig from "../config/ServerConfig"
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
    }

    componentDidMount() {
        this.setState({
            filteredComment: [],
            allComments: []
        });
        this.getAllCommentFromCoursename();
        this.getCourseRatingByCoursename();
    }

    getCourseRatingByCoursename() {
        console.log("Hello");
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
                    this.setState({
                        courseInfo: data.result?.[0],
                        receivedBackEndData: true
                    })
                }
            })
    }

    getAllCommentFromCoursename() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETCOMMENT + "?name=" + this.state.courseName)
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
            </div>
        )
    }
}