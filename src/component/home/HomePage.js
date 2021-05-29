import { RemoveShoppingCartSharp } from "@material-ui/icons"
import React, { Component } from "react"

import Banner from "./Banner"
import CourseCard from "../general/CourseCard"
import Tabs from "./Tabs"

import CourseCards from "../general/CourseCard"
import {Footer, BigFooter} from "../general/Footer"
import ImageStorage from "../general/ImageStorage.js"
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
        const bannerItems = [{
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
        }]

        const CourseTemp = [{
            courseName: "Info340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        },
        {
            courseName: "Info340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        },
        {
            courseName: "Info340",
            courseDescription: "Introduction to web design",
            tags: ["qsr", "vlpa", "idc"],
            credit: "5 credits"
        }
        ]

        const tabItems = [{
            icon: "hotClass",
            id: "trendy",
            text: "热门课程"
        }, {
            icon: "waterClass",
            id: "recommendation",
            text: "“水课” 推荐"
        }]
        console.log(ImageStorage.logo)
        return (
            <div>
                <Banner
                    items={bannerItems}
                />
                <Tabs
                    items={tabItems}
                    active="trendy"
                />
                {
                    CourseTemp.map(element => {
                        return (<CourseCard courseName = {element.courseName}
                                    courseDescription={element.courseDescription}
                                    tags={element.tags}
                                    credit={element.credit} />)
                    })
                }
                { /*<Footer />*/}
                { /*<BigFooter /> */}
                {/*<LoginPage close={this.closeLoginPage} pageStatus={this.state.openLoginWindow}/>*/}

            </div>
        )
    }
}