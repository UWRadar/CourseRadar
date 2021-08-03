import React, { Component } from "react"
import "./Comments.css"
import { Grid } from '@material-ui/core';
import bookmark from '../../img/bookmark.png';
import Comment from "./Comment";
import StarLarge from './StarLarge';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const Comments = (props) => {
    return (
        <div className='comments'>
            <div className='bookmark'>
                <Tooltip title="点我收藏" arrow>
                    <Button>
                        <img className='bookmarkimg' src={bookmark} alt="bookmark" />
                    </Button>
                </Tooltip>
            </div>
            <Grid container xs={12}>
                <Grid className='comment' item xs={8}>
                    <div className='title'>
                        <p className="evaluation">课程评价</p>
                    </div>
                    {
                        props.commentItems.map(element => {
                            return (<Comment name={"匿名"}
                                quarter={element.quarter}
                                professor={element.professorName}
                                gpa={element.GPA}
                                comment={element.comment}
                                />)})
                    }

                </Grid>
                <Grid className='starLarge' item xs={4}>
                    <StarLarge
                        diffRating={props.courseItems.difficulty}
                        workRating={props.courseItems.workload}
                        avgRating = {props.courseItems.averageGPA}
                    />
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <br></br>
        </div>


    )
}

export default Comments