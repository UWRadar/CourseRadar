import "./Comment.css"

import { FiClock } from "react-icons/fi"
import { FiAward } from "react-icons/fi";
import { FiFlag} from "react-icons/fi";


const CommentRating = (props) => {
    return (
        <div className="RatingContainer">
            <div className="difficulty">
                <FiFlag size={20} style={{marginRight: "2px"}}/>
                <p>课程难度</p>
                <p className="ratingLabels"> {props.difficulty} / 5</p>
            </div>

            <div className="difficulty" >
                <FiClock size={20} style={{marginRight: "3px"}}/>
                <p>任务量</p>
                <p className="ratingLabels">{props.workload} / 5 </p>
            </div>

            <div className="difficulty" id="workload">
                <FiAward size={20} style={{marginRight: "2px"}}/>
                <p>成绩</p>
                <p className="ratingLabels"> {props.gpa ? (props.gpa + " / 5") : "暂无"}</p>
            </div>
        </div>
    )
}

export default CommentRating