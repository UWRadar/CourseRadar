import React, { Component } from 'react';
import CourseCards from '../general/CourseCard'
export default class HomePage extends Component {
    render() {
        return (
            <div>
                <CourseCards/>
                <CourseCards/>
            </div>
        )
    }
}