import { RemoveShoppingCartSharp } from "@material-ui/icons"
import React, { Component } from "react"

import Banner from "./Banner"
import CourseCard from "../general/CourseCard"
import Tabs from "./Tabs"
import "./HomePage.css"
import ServerConfig from "../config/ServerConfig"

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        this.intervalId = null
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
            recommened: [],
            popular: [],
            mostTaken: [],
            activeTab: "trendy"
        }
    }

    componentDidMount() {
        this.resetInterval();
        this.getAds();
        this.getPopular();
        this.getRecommended();
    }

    getAds() {
        
        fetch(ServerConfig.SERVER_URL + "/api/ad")
            .then(response => {
                if (response.status == 200) {
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
        })
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
            })
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
            })
    }

    resetInterval() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.switchBanner(1);
        }, 5000);
    }

    render() {
        const CourseTemp = [{
            courseName: "Info 340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }, {
            courseName: "CSE 142",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }, {
            courseName: "CSE 142",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }, {
            courseName: "CSE 142",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }, {
            courseName: "Info 340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }]

        const tabItems = [{
            icon: "hotClass",
            id: "trendy",
            text: "热门课程"
        }, {
            icon: "waterClass",
            id: "recommendation",
            text: "“水课” 推荐"
        }]

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
                        <div class="loading-small">
                            <img class='loading' src="../img/loading.gif" alt="Logo for loading" />
                        </div>
                    }
                    {this.state.loaded && this.state.activeTab === "recommendation" &&
                        this.state.recommened.map(element => (
                            <CourseCard
                                key={element.courseName}
                                courseName={element.courseName}
                                courseDescription={element.courseFullName}
                                tags={element.creditType.split("/")}
                                credit={element.credit}
                            />
                        ))
                    }
                    {this.state.loaded && this.state.activeTab === "trendy" &&
                        this.state.popular.map(element => (
                            <CourseCard
                                key={element.courseName}
                                courseName={element.courseName}
                                courseDescription={element.courseFullName}
                                tags={element.creditType.split("/")}
                                credit={element.credit}
                            />
                        ))
                    }
                </div>
            </div >
        )
    }

    switchBanner(delta) {
        if (this.state.bannerNoAnimation) {
            return
        }
        const bannerItems = this.state.bannerItems
        const newActive = this.state.activeBanner + delta
        const setActive = (newValue) => {
            this.setState({
                activeBanner: newValue
            })
        }
        setActive(newActive)
        if (newActive < 0 || newActive > bannerItems.length - 1) {
            setTimeout(() => {
                this.setState({
                    activeBanner: newActive < 0 ? bannerItems.length - 1 : 0,
                    bannerNoAnimation: true
                })
            }, 500)
            setTimeout(() => {
                this.setState({
                    bannerNoAnimation: false
                })
            }, 1000)
        }
    }
}
