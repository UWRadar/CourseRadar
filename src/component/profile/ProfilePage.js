import { Container } from "@material-ui/core"
import React, { Component } from "react"
import "./ProfilePage.css"
import ImageManger from "../general/ImageManager"
export default class ProfilePage extends Component {


    render() {
        return (
            <Container maxWidth="lg">
                <Container maxWidth = "xl" id='user-info-background'/>
                <section class="user-info">
                        <Container disableGutters = {true}>
                            <div id='user-logo-group'>
                                <div id='user-logo'>
                                    <h1>d</h1>
                                </div>
                                <div id='user-info-logoout'>
                                    <p>退出登录</p>
                                </div>
                            </div>
                            <div id='user-info-detail'>
                                <h1>Hi, <span id='user-info-username'>Didntpay</span></h1>
                                <div class='user-info-container'>
                                    <img src={ImageManger.email}/>
                                    <p id='user-email'>weifengli2014@gmail.com</p>
                                </div>
                                <div id='user-sub-info'>
                                    <div class='user-info-container'>
                                        <img src='../img/major.png'/>
                                        <p id='user-major'></p>
                                    </div>
                                    <div class='user-info-container'>
                                        <img src='./img/student.png'/>
                                        <p id='user-year-Info'><span id='graduate'></span> Graduate</p>
                                    </div>
                                    <div class='user-info-container'>
                                        <img src='./img/club.png'/>
                                        <p id='user-club'><span id='club-info'></span></p>
                                    </div>
                                </div>
                            </div>
                    </Container>
                </section>
            </Container>
        )
    }
}