import React, { Component } from "react"
import "./Comments.css"
import { Grid } from '@material-ui/core';
import bookmark from '../../img/bookmark.png';
import Comment from "./Comment";
import StarLarge from './StarLarge';

const Comments = (commentItems) => {
    return (
        <div className='comments'>
            <div className='bookmark'>
                <img className='bookmarkimg' src={bookmark} alt="bookmark" />
            </div>
            <Grid container xs={12}>
                <Grid className='comment' item xs={8}>
                    <div className='title'>
                        <h1>课程评价</h1>
                    </div>
                    {
                        commentItems.commentItems.map(element => {
                            return (<Comment name={element.name}
                                quarter={element.quarter}
                                professor={element.professor}
                                gpa={element.gpa}
                                comment={element.comment}
                                />)})
                    }
                    
                </Grid>
                <Grid className='starLarge' item xs={4}>
                    <StarLarge />
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <br></br>
        </div>
        
        
    )
}

export default Comments