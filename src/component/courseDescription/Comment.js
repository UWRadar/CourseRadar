import React, { useState } from "react"
import "./Comment.css"
import { ReactComponent as QuarterLogo } from "../../img/quarter.svg"
import { ReactComponent as ProfLogo } from "../../img/professor.svg"
import ImageStorage from "../general/ImageStorage"
import { ReactComponent as Heart } from "../../img/heartUnactive.svg"
import { ReactComponent as HeartActive } from "../../img/heartActive.svg"
import CommentRating from "./CommentRating"
import ServerConfig from "../config/ServerConfig"
function upperTheFirstLetterOfEachWord(word) {
    let name = word.split(" ");
    if (name.length == 1) {
        return name[0][0]?.toUpperCase() + name[0].slice(1);
    } else {
        return name[0][0]?.toUpperCase()
            + name[0].slice(1) + " "
            + name[1][0]?.toUpperCase()
            + name[1].slice(1);
    }
}

const Comment = (props) => {
    const [likeConstant, setLikeConstant] = useState(0);
    const [liked, setLiked] = useState(false);

    const updateLikeCount = (isLike, id) => {
        setLiked(isLike);
        if (isLike) {
            setLikeConstant(1);
            fetch(ServerConfig.SERVER_URL 
                + ServerConfig.UPDATELIKE 
                + "?commentId= " + id)
                .then((res) => {
                    if (res.status != 200) {
                        setLikeConstant(0);
                        setLiked(!isLike);
                        alert("登录后才能点赞哦!");
                    }
                })
        } else {
            setLikeConstant(0);
        }
    }

    let name = upperTheFirstLetterOfEachWord(props.content.professorName)
    let likeCount = props.content.likeCount;
    if (likeCount === undefined){
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
                    <div>
                        {!liked && <Heart onClick={() => updateLikeCount(true, props.content.commentId)} /> }
                        {liked && <HeartActive onClick={() => updateLikeCount(false, props.content.commentId)} /> }         
                        <p className="likeCount">{likeCount + likeConstant}</p>
                    </div>
                               
                
                </div>
                <p className="commentLabel">评论</p>
                <p className="comment">{props.content.comment}</p>
                <CommentRating
                    difficulty={(props.content.workload + props.content.grading) / 2}
                    workload={props.content.workload}
                    gpa={props.content.gpa}
                />
                <hr class="rounded"></hr>
            </div>
        </div>
    )
}

export default Comment