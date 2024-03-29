import React, { Component } from "react";
import Banner from "./Banner";
import CourseCard from "../general/CourseCard";
import Tabs from "./Tabs";
import "./HomePage.css";
import ServerConfig from "../config/ServerConfig";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.state = {
            activeBanner: 0,
            bannerItems: [{
                title: "华大课友冬季招新",
                subtitle: "Want You By Our Side",
                description: "冬季学期已经开学两周了，上网课的你是否感到寂寞？有想法却无处实现？有能力或知识却无处应用？不用担心，快来加入华大课友这个大家庭吧！在这里，你不仅能够认识更多志同道合的小伙伴，也能在实际问题中运用你的才华或技术，更能体验到帮助他人的快乐～",
                image: "https://www.bing.com/th?id=OHR.BlueTitDaffs_ZH-CN3333224685_1920x1080.jpg"
            }, {
                title: "第二张横幅",
                subtitle: "副标题",
                description: "The quick brown fox jumps over the lazy dog",
                image: "https://www.bing.com/th?id=OHR.BlueTitDaffs_ZH-CN3333224685_1920x1080.jpg"
            }, {
                title: "第三张横幅",
                subtitle: "副标题",
                description: "The quick brown fox jumps over the lazy dog",
                image: "https://www.bing.com/th?id=OHR.BlueTitDaffs_ZH-CN3333224685_1920x1080.jpg"
            }],
            bannerNoAnimation: false,
            loaded: false,
            favLoaded: false,
            recommened: [],
            popular: [],
            mostTaken: [],
            favorite: [],
            activeTab: "trendy",
            redirectToLogin: true
        };
    }

    componentDidMount() {
        this.resetInterval();
        this.getAds();
        this.getFavorite();
        this.getPopular();
        this.getRecommended();
        this.getUserInfo();
    }

    getFavorite() {
        // if (!this.state.redirectToLogin) {
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
                let favoriteCourseName = [];
                data["data"].forEach(function (currentValue) { favoriteCourseName.push(currentValue["courseName"]) })
                this.setState({
                    favorite: favoriteCourseName
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
                    favorite: data.favCourses,
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

    getAds() {

        fetch(ServerConfig.SERVER_URL + "/api/ad")
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(data => {
                if (data) {
                    const result = [];
                    for (const key in data.result) {
                        const item = data.result[key];
                        result.push({
                            title: item.title,
                            subtitle: item.subTitle,
                            description: item.content,
                            image: item.picLink,
                            link: item.redirectLink
                        });
                    }
                    this.setState({
                        bannerItems: result
                    });
                }
            });
    }

    changeActiveTab(tabName) {
        this.setState({
            activeTab: tabName
        });
    }

    getPopular() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETPOPULAR)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return [];
                }
            })
            .then((data) => {
                this.setState({
                    popular: data.result
                });
            });
    }

    getRecommended() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETRECOMMENDED)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return [];
                }
            })
            .then((data) => {
                this.setState({
                    loaded: true,
                    recommened: data.result
                });
            });
    }

    resetInterval() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.switchBanner(1);
        }, 5000);
    }

    render() {
        const tabItems = [{
            icon: "hotClass",
            id: "trendy",
            text: "热门课程"
        }, {
            icon: "waterClass",
            id: "recommendation",
            text: "“水课” 推荐"
        }];

        return (
            <div className="home">
                <Banner className="banner"
                    items={this.state.bannerItems}
                    active={this.state.activeBanner}
                    noAnimation={this.state.bannerNoAnimation}
                    onChange={(delta) => {
                        this.switchBanner(delta);
                        this.resetInterval();
                    }}
                    onMouseEnter={() => {
                        clearInterval(this.intervalId);
                    }}
                    onMouseLeave={() => {
                        this.resetInterval();
                    }}
                />
                <Tabs
                    items={tabItems}
                    active={this.state.activeTab}
                    setActiveTab={(data) => this.changeActiveTab(data)}
                />
                <div className="course-list">
                    {!this.state.loaded &&
                        <div className="loading-small">
                            <img className='loading' src="../img/loading.gif" alt="Logo for loading" />
                        </div>
                    }
                    {this.state.favLoaded && this.state.loaded && this.state.activeTab === "recommendation" &&
                        this.state.recommened.map(element => (
                            <CourseCard
                                key={element.courseName}
                                courseName={element.courseName}
                                courseDescription={element.courseFullName}
                                tags={element.creditType.split("/")}
                                credit={element.credit}
                                loginStatus={!this.state.redirectToLogin}
                                isFavorite={this.state.favorite.includes(element.courseName)}
                            />
                        ))
                    }
                    {this.state.favLoaded && this.state.loaded && this.state.activeTab === "trendy" &&
                        this.state.popular.map(element => (
                            <CourseCard
                                key={element.courseName}
                                courseName={element.courseName}
                                courseDescription={element.courseFullName}
                                tags={element.creditType.split("/")}
                                credit={element.credit}
                                loginStatus={!this.state.redirectToLogin}
                                isFavorite={this.state.favorite.includes(element.courseName)}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }

    switchBanner(delta) {
        if (this.state.bannerNoAnimation) {
            return;
        }
        const bannerItems = this.state.bannerItems;
        const newActive = this.state.activeBanner + delta;
        const setActive = (newValue) => {
            this.setState({
                activeBanner: newValue
            });
        };
        setActive(newActive);
        if (newActive < 0 || newActive > bannerItems.length - 1) {
            setTimeout(() => {
                this.setState({
                    activeBanner: newActive < 0 ? bannerItems.length - 1 : 0,
                    bannerNoAnimation: true
                });
            }, 500);
            setTimeout(() => {
                this.setState({
                    bannerNoAnimation: false
                });
            }, 1000);
        }
    }
}
