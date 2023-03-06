import React, { useState } from "react"
import "./Comment.css"
import { ReactComponent as QuarterLogo } from "../../img/quarter.svg"
import { ReactComponent as ProfLogo } from "../../img/professor.svg"
import { ReactComponent as Heart } from "../../img/heart.svg"
import { ReactComponent as HeartActive } from "../../img/heart-fill.svg"
import { ReactComponent as HeartBreak } from "../../img/heartbreak.svg"
import { ReactComponent as HeartBreakActive } from "../../img/heartbreak-fill.svg"
import CommentRating from "./CommentRating"
import ServerConfig from "../config/ServerConfig"
function upperTheFirstLetterOfEachWord(word) {
    let name = word.split(" ");
    if (name.length === 1) {
        return name[0][0]?.toUpperCase() + name[0].slice(1);
    } else {
        return name[0][0]?.toUpperCase()
            + name[0].slice(1) + " "
            + name[1][0]?.toUpperCase()
            + name[1].slice(1);
    }
}

const Comment = (props) => {
    const [liked, setLiked] = useState(false);

    const updateLikeCount = (newLiked, id) => {
        setLiked(newLiked);
        if (newLiked) {
            fetch(ServerConfig.SERVER_URL
                + ServerConfig.UPDATELIKE
                + "?commentId= " + id, {
                credentials: "include"
            })
                .then((res) => {
                    if (res.status !== 200) {
                        setLiked(0);
                        alert("登录后才能点哦!");
                    }
                })
        } else {
            setLiked(0);
        }
    }

    const handleLike = (newLiked, id) => {
        if (
            (liked === -1 && newLiked === 1) ||
            (liked === 1 && newLiked === -1)
        ) {
            updateLikeCount(newLiked, id);
        }
        updateLikeCount(newLiked, id);
    }

    let name = upperTheFirstLetterOfEachWord(props.content.professorName)
    let likeCount = props.content.likeCount;
    if (likeCount === undefined) {
        likeCount = 0;
    }
    return (
        <div className="container-fluid">
            <div className="col">
                <div className="commentName">
                    <div className="commentID">

                        <div className="commentDetail">
                            <ProfLogo className="detailLogos" />
                            <p className="commentQuarter">{name}</p>
                        </div>
                        <div className="commentDetail">
                            <QuarterLogo className="detailLogos" />
                            <p className="commentQuarter">{props.content.year + " " + props.content.quarter}</p>
                        </div>


                    </div>
                    {!props.isPrivate && <div>
                        {liked !== 1 && <Heart onClick={() => handleLike(1, props.content.commentId)} />}
                        {liked === 1 && <HeartActive onClick={() => handleLike(0, props.content.commentId)} />}
                        {liked !== -1 && <HeartBreak onClick={() => handleLike(-1, props.content.commentId)} />}
                        {liked === -1 && <HeartBreakActive onClick={() => handleLike(0, props.content.commentId)} />}
                        <p className="likeCount">{likeCount + liked}</p>
                    </div>}


                </div>
                {props.isPrivate && <div className="comment-warning">
                    ⚠️ 审核中，这条课评暂时仅自己可见。
                </div>}
                <p className="commentLabel">评论</p>
                <p className="comment">{props.content.comment}</p>
                <CommentRating
                    difficulty={(props.content.workload + props.content.grading) / 2}
                    workload={props.content.workload}
                    gpa={props.content.gpa}
                />
                <hr className="rounded"></hr>
            </div>
        </div>
    )
}

export default Comment