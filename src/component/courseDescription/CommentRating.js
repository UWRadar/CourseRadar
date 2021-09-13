import "./Comment.css"

import {ReactComponent as DifficultyLogo} from "../../img/flag.svg"
import {ReactComponent as WorkLoadLogo} from "../../img/clock.svg"
import {ReactComponent as GPALogo} from "../../img/award.svg"
const CommentRating = (props) => {
    return (
        <div className="RatingContainer">
            <div className="difficulty">
                <DifficultyLogo style={{fill: "#63469D"}}/>
                <p>课程难度</p>
                <p className="ratingLabels"> {props.difficulty} / 5</p>
            </div>

            <div className="difficulty" >
                <WorkLoadLogo/>
                <p>任务量</p>
                <p className="ratingLabels">{props.workload} / 5 </p>
            </div>

            <div className="difficulty" id="workload">
                <GPALogo/>
                <p>成绩</p>
                <p className="ratingLabels"> {props.gpa == undefined ? "暂无" : props.gpa + " / 5"}</p>
            </div>
        </div>
    )
}

export default CommentRating