import React, { Component } from "react";
import Description from "./Description";
import Comments from "./Comments";
import "./Description.css";
import ServerConfig from "../config/ServerConfig";

class CourseDescription extends Component {
    constructor(props) {
        super();
        this.state = {
            filteredComment: [],
            allComments: [],
            courseName: props.match.params.courseName,
            courseInfo: {},
            receivedBackEndData: false
        };
    }

    componentDidMount() {
        this.setState({
            filteredComment: [],
            allComments: []
        });
        this.getAllCommentFromCoursename();
        this.getCourseRatingByCoursename();
        if (this.captcha) {
            this.captcha.reset();
            this.captcha.execute();
        }
    }

    replaceNullWithZero(courseRating) {
        for (const [key, value] of Object.entries(courseRating)) {
            if (value == null) {
                courseRating[key] = 0;
            }
        }
    }

    getCourseRatingByCoursename() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETCOURSERATING + "?courseName=" + this.state.courseName)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return {};
                }
            })
            .then((data) => {
                if (data) {
                    this.replaceNullWithZero(data.result[0]);
                    this.setState({
                        courseInfo: data.result[0],
                        receivedBackEndData: true
                    });
                }
            });
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
                });
            });
    }

    render() {
        return (
            <div className="container-fluid" id="outerCotainer">
                <div className="col" id="description">
                    {this.state.receivedBackEndData && <>
                        <Description
                            courseItems={this.state.courseInfo}
                            courseName={this.state.courseName}
                        />
                        <p className="commentTitle">课程评价</p>
                        <Comments
                            className="comments"
                            comments={this.state.allComments}
                        />
                    </>}
                </div>
            </div>
        );
    }
}

export default CourseDescription;
