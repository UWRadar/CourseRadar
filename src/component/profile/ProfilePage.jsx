import { Container } from "@material-ui/core"
import React, { Component } from "react"
import "./ProfilePage.css"
import CourseCard from "../general/CourseCard"
import ImageStorage from "../general/ImageStorage"
import Tabs from "../home/Tabs"
import md5 from "md5"
import ServerConfig from "../config/ServerConfig"
import { withRouter, Redirect } from 'react-router-dom';
class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "favCourses",

            email: null,
            username: null,
            favLoaded: false,
            favCourses: [],

            newUsername: "",
            newPassword: "",
            newRepassword: ""
        };
    }

    componentDidMount() {
        this.getUserInfo();
        this.getFavorite();
    }

    getUserInfo() {
        fetch(ServerConfig.SERVER_URL + "/api/userinfo", {
            credentials: "include"
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 403) {
                throw new Error("unauthorized");
            }
        }).then(data => {
            if (data) {
                this.setState({
                    email: data.email,
                    favCourses: data.favCourses,
                    username: data.username,
                    redirectToLogin: false
                });
            }
        }).catch(() => {
            this.setState({
                redirectToLogin: true
            });
        });
    }

    getFavorite() {
        // if (!this.state.redirectToLogin) {
        console.log(333);
        fetch(ServerConfig.SERVER_URL + "/api/isFavorite", {
            body: JSON.stringify({
                // courseName: name.toLowerCase()
            }),
            credentials: "include",
            method: "POST"
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                console.log(res);
            }
        }).then(data => {
            console.log(data);
            if (data && data["state"] === 1) {
                this.setState({
                    favCourses: data["data"]
                });
            }
            this.setState({
                favLoaded: true
            })
            console.log(this.state.favorite);
            // if(data.state === 0) {
            //     return false;
            // } else {
            //     return true;
            // }
        })
        // }
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/login" />
        }
        const tabItems = [{
            icon: "saveActive",
            id: "favCourses",
            text: "收藏"
        }, {
            icon: "setting",
            id: "settings",
            text: "设置"
        }];
        const renderFavCourses = () => {
            const favCourses = this.state.favCourses;
            console.log(favCourses);
            if (favCourses.length === 0) {
                return <img id="no-result" src="./img/no-result.png" alt="No Results" />
            } else {
                return favCourses.map((element, index) => (
                    <CourseCard
                        key={index}
                        courseName={element.courseName}
                        courseDescription={element.courseDescription}
                        tags={element.tags}
                        credit={element.credit}
                        loginStatus={!this.state.redirectToLogin}
                        isFavorite={true}
                    />
                ));
            }
        }
        const renderInputBars = (items) => {
            const result = []
            for (let i = 0; i < items.length; i++) {
                const item = items[i]
                const id = item.id
                result.push(
                    <div className="input-bar">
                        <label for={id}>{item.label}</label>
                        <input
                            id={id}
                            name={id}
                            type={item.type}
                            autoComplete={item.autoComplete}
                            onChange={evt => {
                                this.setState({
                                    [id]: evt.target.value
                                });
                            }} />
                    </div>
                )
            }
            return result;
        }
        return (
            <Container classes={{ root: "profile-page" }} maxWidth="lg">
                <Container maxWidth="xl" id="user-info-background" />
                <section className="user-info">
                    <Container disableGutters={true}>
                        <div id="user-logo-group">
                            <div id="user-logo">
                                <h1>{this.state.username && this.state.username.substring(0, 1)}</h1>
                            </div>
                            <button className="btn btn-danger" id="user-info-logoout" onClick={() => {
                                fetch(ServerConfig.SERVER_URL + "/api/logout", {
                                    credentials: "include",
                                    method: "POST"
                                }).then(response => {
                                    if (response.ok) {
                                        this.props.history.push("/login");
                                    } else {
                                        alert("退出登录时出错。");
                                    }
                                });
                            }}>
                                <p>退出登录</p>
                            </button>
                        </div>
                        <div id="user-info-detail">
                            <h1>Hi, <span id="user-info-username">{this.state.username}</span></h1>
                            <div className="user-info-container">
                                <img src={ImageStorage.email} alt="Email" />
                                <span id="user-email">{this.state.email}</span>
                            </div>
                        </div>
                    </Container>
                </section>
                <Tabs
                    items={tabItems}
                    active={this.state.activeTab}
                    setActiveTab={(newActiveTab) => {
                        this.setState({
                            activeTab: newActiveTab
                        });
                    }}
                />
                {this.state.activeTab === "favCourses" && renderFavCourses()}
                <p className={"profile-settings" + (this.state.activeTab === "settings" ? "" : " hide")}>
                    {renderInputBars([{
                        autoComplete: "name",
                        id: "newUsername",
                        label: "新用户名",
                        type: "text"
                    }, {
                        autoComplete: "new-password",
                        id: "newPassword",
                        label: "新密码",
                        type: "password"
                    }, {
                        autoComplete: "new-password",
                        id: "newRepassword",
                        label: "重新输入新密码",
                        type: "password"
                    }])}
                    <button id="save-changes" onClick={() => {
                        const newPassword = this.state.newPassword;
                        const newUsername = this.state.newUsername;
                        if (!newPassword && !newUsername) {
                            return;
                        } else if (this.state.newRepassword !== newPassword) {
                            alert("两次输入的密码不一致。");
                            return;
                        }
                        fetch(ServerConfig.SERVER_URL + "/api/changeprofile", {
                            body: JSON.stringify({
                                password: newPassword ? md5(newPassword) : null,
                                username: newUsername
                            }),
                            method: "POST"
                        }).then(response => {
                            if (response.ok) {
                                alert("已保存更改！");
                            } else {
                                alert("保存更改时出错：" + response.status);
                            }
                        }).catch(() => {
                            alert("无法连接到服务器。");
                        });
                    }}>保存更改</button>
                </p>
            </Container>
        )
    }


}

export default withRouter(ProfilePage);
