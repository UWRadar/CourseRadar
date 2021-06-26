import React, { Component } from "react"
import Description from "./Description"
import Comments from "./Comments"
import "./Description.css"
export default class CourseDescription extends Component {
    render() {
        const commentItems = [{
            name: "红领巾",
            quarter: "WI",
            professor: "Brett Reges",
            gpa: "3.5",
            comment:"I think he is a great professor. I enjoyed taking psych with him. I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him. "
        }, 
        {
            name: "红领巾",
            quarter: "WI",
            professor: "Brett Reges",
            gpa: "3.5",
            comment:"I think he is a great professor. I enjoyed taking psych with him. I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him. "
        }, 
        {
            name: "红领巾",
            quarter: "WI",
            professor: "Brett Reges",
            gpa: "3.5",
            comment:"I think he is a great professor. I enjoyed taking psych with him. I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him. "
        }, 
        {
            name: "红领巾",
            quarter: "WI",
            professor: "Brett Reges",
            gpa: "3.5",
            comment:"I think he is a great professor. I enjoyed taking psych with him. I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him. "
        }, 
        {
            name: "红领巾",
            quarter: "WI",
            professor: "Brett Reges",
            gpa: "3.5",
            comment:"I think he is a great professor. I enjoyed taking psych with him. I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him. "
        }, 
        {
            name: "红领巾",
            quarter: "WI",
            professor: "Brett Reges",
            gpa: "3.5",
            comment:"I think he is a great professor. I enjoyed taking psych with him. I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him.  I think he is a great professor. I enjoyed taking psych with him. "
        }]

        const courseItems = {
            code: "PSYCH101",
            name: "Introduction to Psychology",
            credit: "5",
            desc: "Surveys major areas of psychological science. Core topics include human social behavior, personality, psychological disorders and treatment, learning, memory, human development, biological influences, and research methods.",
            tags:["VLPA", "NW"]
        }
        return (
            <div className="coursedescription">
                <Description courseItems={courseItems}/>
                <Comments commentItems={commentItems}/>
            </div>
        )
    }
}