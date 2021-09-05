import React from "react"
import "./Comment.css"
import {ReactComponent as QuarterLogo} from "../../img/quarter.svg"
import {ReactComponent as ProfLogo} from "../../img/professor.svg"
import ImageStorage from "../general/ImageStorage"
import CommentRating from "./CommentRating"
const Comment = (props) => {
    return (
        <div className="container-fluid">
            <div className="col">
                <div className="commentName">
                    <img className='commentlogo' src={ImageStorage.commentLogo} alt="profile logo" />
                    <p className="studnetName">匿名</p>

                    <div className="commentID">
                        <div className="commentDetail">
                            <QuarterLogo className="detailLogos"/>
                            <p className="commentQuarter">{props.content.year + " " + props.content.quarter}</p>
                        </div>

                        <div className="commentDetail">
                            <ProfLogo className="detailLogos"/>
                            <p className="commentQuarter">{props.content.professorName}</p>
                        </div>
                    </div>               
                
                </div>
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