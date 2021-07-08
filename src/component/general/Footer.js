import React from "react"
import "./Footer.css"
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';

export default function Footer() {
    return(
        <footer id = 'nav'>
            <img id = 'footer-img-for-nav' src="../img/original4.png" className="web-logo" alt="Logo for Course Radar" />
            <div id='logos'>
                <Popup trigger={<img src='../img/Wechat-logo.svg' alt="logo for Wechat"></img>} position="left middle" offsetX="10" arrow="true">
                    <img src="../img/QR_code.jpg" alt="logo for QRcode" id="QRcode"></img>
                    <p>微信扫码</p>
                </Popup>
                <a href="https://weibo.com/u/7372059969"><img src='../img/Weibo-logo.svg' target="_blank" alt="logo for Weibo"></img> </a>
                <a href="https://space.bilibili.com/494538320" target="_blank"> <img src='../img/bilibili-logo.svg' alt="logo for bilibili"></img> </a>
                <a href="https://www.zhihu.com/people/hua-da-ke-you" target="_blank"><img src='../img/zhihu-logo.svg' alt="logo for zhihu"></img> </a>
                <a href="mailto:ohcmuw@gmail.com"><img src='../img/mail-logo.svg' alt="logo for mail"></img> </a>
            </div>
        </footer>
    ) 
}

