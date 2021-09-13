import React, { useState }  from "react"
import "./Comment.css"
import {ReactComponent as QuarterLogo} from "../../img/quarter.svg"
import {ReactComponent as ProfLogo} from "../../img/professor.svg"
import ImageStorage from "../general/ImageStorage"
import {ReactComponent as Heart} from "../../img/heartUnactive.svg"
import {ReactComponent as HeartActive} from "../../img/heartActive.svg"
import CommentRating from "./CommentRating"

function upperTheFirstLetterOfEachWord(word) {
    let name = word.split(" "); 
    if (name.length == 1) {
        return name[0][0].toUpperCase() + name[0].slice(1);
    } else {
        return name[0][0].toUpperCase() 
                + name[0].slice(1) + " " 
                + name[1][0].toUpperCase() 
                + name[1].slice(1);
    }
}


const Comment = (props) => {
    let name = upperTheFirstLetterOfEachWord(props.content.professorName)
    const [liked, setLiked] = useState(false);
    return (
        <div className="container-fluid">
            <div className="col">
                <div className="commentName">
                    <div className="commentID">
                        
                        <div className="commentDetail">
                            <ProfLogo className="detailLogos"/>
                            <p className="commentQuarter">{name}</p>
                        </div>
                        <div className="commentDetail">
                            <QuarterLogo className="detailLogos"/>
                            <p className="commentQuarter">{props.content.year + " " + props.content.quarter}</p>
                        </div>
        
                        
                    </div>    
                    {!liked && <Heart onClick={() => setLiked(true)} /> }
                    {liked && <HeartActive onClick={() => setLiked(false)} /> }         

                               
                
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