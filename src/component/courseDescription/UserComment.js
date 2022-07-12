import "./UserComment.css"


const UserComment = (props) => {
    return (
        <div className="user-comment-section">
            <hr className="rounded comment-line"></hr>
            <p className="name">匿名用户</p>
            <p className="content">{props.content}</p>

        </div>
    )
}

export default UserComment;