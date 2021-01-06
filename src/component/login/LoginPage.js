import React, { Component } from "react"
import "./LoginPage.css"
import logo from '../../img/login-logo.png'
export default class LoginPage extends Component {
    render() {
        return (
            <div class="login-container " aria-label="Seaching area">
                <img src={logo} alt="Logo" />
                <div id= "login-form" action="">
                    <input id="email" placeholder="邮箱" name="email" inputProps={{ 'aria-label': 'description' }} />
                    <input id="pass" placeholder="密码" name="passwd" inputProps={{ 'aria-label': 'description' }} />
                    <button id="loging-main" aria-label="Login button">登陆</button>
                    <p id="sign-up"> 注册账号</p> 
                </div>

                <div id="signup-form" class='hide' action="">
                    <input id="uname-signup" placeholder="用户名" name="Username" inputProps={{ 'aria-label': 'Username' }} />
                    <input id="email-signup" placeholder="Email" name="email" inputProps={{ 'aria-label': 'Password' }} />
                    <input id="pass-signup" placeholder="密码" name="passwd" inputProps={{ 'aria-label': 'Password' }} />
                    <input id="repass-signup" placeholder="请重复输入密码" name="repasswd" inputProps={{ 'aria-label': 'Password' }} />
                    <input id="club-signup" placeholder="所属社团(选填)" name="club" inputProps={{ 'aria-label': 'Password' }} />
                    <input id="yearOfGrad-signup" placeholder="毕业年份（选填）" name="gradYear" inputProps={{ 'aria-label': 'Password' }} />
                    <input id="major-signup" placeholder="Major（选填" name="major" inputProps={{ 'aria-label': 'Password' }} />
                    <button id="sign-main" aria-label="Login button" type="button">注册</button>
                    <p id="sign-up-back">返回登陆</p>
                </div>
            </div>
        )
    }
}