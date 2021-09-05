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
            
                {props.comments.map(comment => {
                    return (<Comment content={comment}/>)
                })}
            
        </div>
        
        
    )
}

export default Comments