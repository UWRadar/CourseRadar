import React, { Component } from "react"
import CourseCard from "../general/CourseCard"
import "./SearchResultPage.css"

export default class SearchResultPage extends Component {
    render() {
        const courseTemp = [{
            courseName: "Info 340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }, {
            courseName: "Info 340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }, {
            courseName: "Info 340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }]
        const renderRadioBoxes = (name, items) => {
            const result = []
            for (let i = 0; i < items.length; i++) {
                const randomId = Math.random().toString(36).substring(2)
                result.push(
                    <div>
                        <input id={randomId} name={name} type="radio"></input>
                        <label for={randomId}>{items[i]}</label>
                    </div>
                )
            }
            return result
        }
        return (
            <div className="search-result">
                <div className="filter">
                    <h1>筛选</h1>
                    <h2>课程级别</h2>
                    <div>{renderRadioBoxes("course-level", [100, 200, 300, 400])}</div>
                    <h2>学分</h2>
                    <div>{renderRadioBoxes("credits", [1, 2, 3, 4, 5])}</div>
                    <h2>通识教育要求</h2>
                    <div>{renderRadioBoxes("gen-edu-req", ["VLPA", "QSR", "NW", "I&S"])}</div>
                </div>
                <div className="course-list">
                    {
                        courseTemp.map(element => (
                            <CourseCard
                                courseName={element.courseName}
                                courseDescription={element.courseDescription}
                                tags={element.tags}
                                credit={element.credit}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}