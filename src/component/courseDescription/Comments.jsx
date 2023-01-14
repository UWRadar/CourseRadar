import React, { Component } from "react";
import "./Comments.css";
import Comment from "./Comment";
import ServerConfig from "../config/ServerConfig";

export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: [],
            prevLen: 0
        };
    }

    async updateLikeCountOnComments(comments) {
        this.setState({
            comments: comments,
            prevLen: comments.length
        })
        let parsedComment = [];
        let len = comments.length;
        for (let i = 0; i < len; i++) {
            let element = comments[i];
            const response = await fetch(ServerConfig.SERVER_URL
                + ServerConfig.GETLIKE + "?commentId= " + element.commentId);

            if (response.status === 200) {
                const jsonData = await response.json();
                element.likeCount = jsonData.count;
                parsedComment.push(element);
            } else {
                parsedComment.push(element);
            }
        }
        this.setState({
            comments: parsedComment,
            prevLen: parsedComment.length
        });
    }

    componentDidUpdate() {
        let len = this.props.comments;
        if (this.state.prevLen === 0 && len !== 0) {
            this.updateLikeCountOnComments(this.props.comments);
        }
    }

    componentDidMount() {
        let len = this.props.comments.length;
        if (len === 0) {
            this.setState({
                prevLen: 0
            });
            return;
        }
        this.updateLikeCountOnComments(this.props.comments);
    }

    render() {
        return (
            <div className='comments'>
                {this.state.comments.map((comment, index) => {
                    return <Comment content={comment} key={index} />
                })}
            </div>
        );
    }
}
