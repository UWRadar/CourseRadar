import { RemoveShoppingCartSharp } from "@material-ui/icons"
import React, { Component } from "react"
import CourseCards from "../general/CourseCard"
import {Footer, BigFooter} from "../general/Footer"
import Header from "../general/Header"
import LoginPage from "../general/LoginPage"
import LargeHeader from "../general/LargeHeader"

export default class HomePage extends Component {
    /* constructor(props) {
        super(props)
        this.state = {
            openLoginWindow: true,
        }
    }

    close = () => {
        this.setState({
            openLoginWindow: false,
        })
    }*/
    render() {
        return (
            <div>
                <LargeHeader />
                <CourseCards />
                <CourseCards />
                { /*<Footer />*/}
                { /*<BigFooter /> */}
                {/*<LoginPage close={this.closeLoginPage} pageStatus={this.state.openLoginWindow}/>*/}
            </div>
        )
    }
}