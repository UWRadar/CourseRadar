import React, { Component } from "react"
import CourseCards from "../general/CourseCard"
import {Footer, BigFooter} from "../general/Footer"
import Header from "../general/Header"
export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Header />
                <CourseCards />
                <CourseCards />
                <Footer />
                <BigFooter />
                
            </div>
        )
    }
}