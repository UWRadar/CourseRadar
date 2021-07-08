import { RemoveShoppingCartSharp } from "@material-ui/icons"
import React, { Component } from "react"

import Banner from "./Banner"
import CourseCard from "../general/CourseCard"
import Tabs from "./Tabs"
import "./HomePage.css"
import { Footer, BigFooter } from "../general/Footer"
import ImageStorage from "../general/ImageStorage.js"
import LoginPage from "../general/LoginPage"
import LargeHeader from "../general/LargeHeader"
import { NavLink } from "react-router-dom"
import SearchBar from "../general/SearchFilter"
import ServerConfig from "../config/ServerConfig"

export default class HomePage extends Component {
    constructor(props) {
        super(props)
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
            loaded : false,
            recommened: [],
            popular: [],
            mostTaken: [],
            activeTab: "trendy"
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.switchBanner(1)
        }, 5000)
        this.getPopular();
        this.getRecommended();
    }

    changeActiveTab(tabName) {
        this.setState({activeTab: tabName})
    }

    getPopular() {
        fetch(ServerConfig.SERVER_URL + ServerConfig.GETPOPULAR)
        .then(response => {
            if (response.ok){
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
            if (response.ok){
                return response.json();
            } else {
                return [];
            }
        })
        .then((data) => {
            console.log(data)
            this.setState({
                loaded : true,
                recommened: data.result
            });
        })
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
                <div className="bg-img">
                    <SearchBar />
                    <div className="arrow-down" onClick={() => {
                        let intervalId = setInterval(() => {
                            let y1 = window.scrollY
                            window.scrollTo(0, window.scrollY + 2)
                            let y2 = window.scrollY
                            if (y1 == y2 || window.scrollY > window.innerHeight) {
                                clearInterval(intervalId)
                            }
                        }, 1)
                    }}></div>
                </div>

                <Banner className="banner"
                    items={this.state.bannerItems}
                    active={this.state.activeBanner}
                    onchange={(delta) => {
                        this.switchBanner(delta)
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
                                <img class = 'loading' src="../img/loading.gif" alt="Logo for loading" />
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
        const newActive = this.state.activeBanner + delta
        const setActive = (newValue) => {
            this.setState({
                activeBanner: newValue
            })
        }
        if (newActive >= 0 && newActive < this.state.bannerItems.length) {
            setActive(newActive)
        } else if (newActive < 0) {
            setActive(this.state.bannerItems.length - 1)
        } else {
            setActive(0)
        }
    }
}
