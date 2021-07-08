import React, { Component } from "react"
import "./LoginPage.css"
import logo from '../../img/login-logo.png'
import md5 from "md5"
import firebase from "firebase/app"
import "firebase/analytics"
import "firebase/auth"
export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,

            loginEmail: null,
            loginPassword: null,

            signupEmail: null,
            signupUsername: null,
            signupPassword: null,
            signupRepassword: null,
            signupClub: null,
            signupGradYear: null,
            signupMajor: null,

            code: null
        }
        const firebaseConfig = {
            apiKey: "AIzaSyABjoaBk627ifVPDG3Z6rNR0y7O36zkXbk",
            authDomain: "courseradar-8ad69.firebaseapp.com",
            projectId: "courseradar-8ad69",
            storageBucket: "courseradar-8ad69.appspot.com",
            messagingSenderId: "1080967899514",
            appId: "1:1080967899514:web:e780d983047d54dc254ec3",
            measurementId: "G-62MPM7RWL1"
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        firebase.analytics()
    }

    render() {
        return (
            <div className="login-container" aria-label="Seaching area">
                <div id="login-description">
                    <img src={logo} alt="Logo" />
                    <p>用户可以收藏、点赞课评</p>
                    <p>未来会根据收藏/浏览的课评进行推荐</p>
                </div>
                <div id="login-form" className={"form" + (this.state.page == 1 ? "" : " hide")}>
                    <input id="email" type="email" name="email" placeholder="邮箱" onChange={evt => this.setState({ loginEmail: evt.target.value })} />
                    <input id="password" type="password" name="password" placeholder="密码" onChange={evt => this.setState({ loginPassword: evt.target.value })} />
                    <button id="loging-main" aria-label="Login button" onClick={() => { this.login() }}>登录</button>
                    <p className="link-bar">
                        <a onClick={() => this.loginWithGoogle()}>使用 Google 账号登录</a>
                        <a id="sign-up" className="float-right" onClick={() => this.setPage(2)}>注册账号</a>
                    </p>
                </div>

                <div id="signup-form" className={"form" + (this.state.page == 2 ? "" : " hide")}>
                    <input id="uname-signup" placeholder="用户名" name="username" onChange={evt => this.setState({ signupUsername: evt.target.value })} />
                    <input id="email-signup" type="email" placeholder="邮箱" name="email" onChange={evt => this.setState({ signupEmail: evt.target.value })} />
                    <input id="pass-signup" type="password" placeholder="密码" name="passwd" onChange={evt => this.setState({ signupPassword: evt.target.value })} />
                    <input id="repass-signup" type="password" placeholder="请重复输入密码" name="repasswd" onChange={evt => this.setState({ signupRepassword: evt.target.value })} />
                    <input id="club-signup" placeholder="所属社团（选填）" name="club" onChange={evt => this.setState({ signupClub: evt.target.value })} />
                    <input id="yearOfGrad-signup" placeholder="毕业年份（选填）" name="gradYear" onChange={evt => this.setState({ signupGradYear: evt.target.value })} />
                    <input id="major-signup" placeholder="Major（选填）" name="major" onChange={evt => this.setState({ signupMajor: evt.target.value })} />
                    <button id="sign-main" type="button" onClick={() => { this.signup() }}>注册</button>
                    <p className="link-bar">
                        <a id="sign-up-back" className="float-right" onClick={() => this.setPage(1)}>返回登录</a>
                    </p>
                </div>

                <div id="verify-form" className={"form" + (this.state.page == 3 ? "" : " hide")}>
                    <input id="code" placeholder="验证码" name="code" onChange={evt => this.setState({ code: evt.target.value })} />
                    <button id="verify-submit-btn" type="button" onClick={() => { this.verify() }}>提交</button>
                    <p className="link-bar">
                        <a id="resend" className="float-right" onClick={() => this.resend()}>重新发送</a>
                    </p>
                </div>
            </div>
        )
    }

    login() {
        if (!this.state.loginEmail || !this.state.loginPassword) {
            alert("请输入邮箱和密码。")
            return
        }
        this.state.loginEmail = this.state.loginEmail.toLowerCase()
        fetch("http://localhost:9000/api/login", {
            body: JSON.stringify({
                email: this.state.loginEmail,
                password: md5(this.state.loginPassword)
            }),
            credentials: "include",
            method: "POST"
        }).then((response) => response.json()).then((data) => {
            if (data) {
                if (data.success) {
                    this.loginSuccess()
                } else {
                    let msg
                    switch (data.error) {
                        case "passwordIncorrect":
                            msg = "密码错误！"
                            break
                        case "thirdPartyLoginRequired":
                            msg = "请使用第三方账号登录。"
                            break
                        case "userNotExist":
                            msg = "用户不存在。"
                            break
                        default:
                            msg = data.error
                            break
                    }
                    alert(msg)
                }
            }
        })
    }

    loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                result.user.getIdToken().then(idToken => {
                    fetch("http://localhost:9000/api/loginfirebase", {
                        body: JSON.stringify({
                            idToken: idToken
                        }),
                        credentials: "include",
                        method: "POST"
                    }).then((response) => {
                        if (response.ok) {
                            this.loginSuccess()
                        } else {
                            alert("Firebase 验证出错。")
                        }
                    })
                })
            }).catch((error) => {
                console.error(error)
                if (error.code != "auth/popup-closed-by-user") {
                    alert("Firebase 验证出错：" + error.message)
                }
            })
    }

    loginSuccess() {
        alert("登录成功！")
        window.location.href = "/profile"
    }

    setPage(value) {
        // 1 - 登录
        // 2 - 注册
        // 3 - 验证码
        this.setState({
            page: value
        })
        window.scrollTo(0, 0)
    }

    signup() {
        if (!this.state.signupEmail || !this.state.signupPassword || !this.state.signupRepassword) {
            alert("请设置邮箱和密码。")
            return
        }
        this.state.signupEmail = this.state.signupEmail.toLowerCase()
        if (!this.state.signupEmail.endsWith("@uw.edu")) {
            alert("必须使用 @uw.edu 后缀的邮箱。")
            return
        } else if (this.state.signupPassword != this.state.signupRepassword) {
            alert("两次输入的密码不一致。")
            return
        }
        fetch("http://localhost:9000/api/signup", {
            body: JSON.stringify({
                email: this.state.signupEmail,
                password: md5(this.state.signupPassword),

                username: this.state.signupUsername,
                club: this.state.signupClub,
                gradYear: this.state.signupGradYear,
                major: this.state.signupMajor
            }),
            method: "POST"
        }).then((response) => response.json()).then((data) => {
            if (data) {
                if (data.success) {
                    alert("请输入发送到您的邮箱的验证码。")
                    this.setPage(3)
                } else {
                    let msg
                    switch (data.error) {
                        case "unableSendEmail":
                            msg = "发送验证邮件时出错。"
                            break
                        case "userExists":
                            msg = "用户已存在。"
                            break
                        default:
                            msg = data.error
                            break
                    }
                    alert(msg)
                }
            }
        })
    }

    verify() {
        if (!this.state.code) {
            alert("请输入发送到您的邮箱的验证码。")
            return
        }
        fetch("http://localhost:9000/api/verifyemail", {
            body: JSON.stringify({
                code: this.state.code,
                email: this.state.signupEmail
            }),
            method: "POST"
        }).then((response) => response.json()).then((data) => {
            if (data) {
                if (data.success) {
                    alert("注册成功！")
                    this.setPage(1)
                } else {
                    let msg
                    switch (data.error) {
                        case "codeIncorrect":
                            msg = "验证码错误。"
                            break
                        case "paramMissing":
                            msg = "缺少参数。"
                            break
                        case "userNotExist":
                            msg = "用户不存在。"
                            break
                        default:
                            msg = data.error
                            break
                    }
                    alert(msg)
                }
            }
        })
    }
}
