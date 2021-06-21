import React from "react"
import "./Footer.css"
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return(
        <footer id = 'nav'>
            <div id='footer-nav-container'>
                <img id = 'footer-img-for-nav' src="../img/original6.png" className="web-logo" alt="Logo for Course Radar" />
            </div>
            <div id="home" className='footer-active'>
                    <img src="../img/home-active.png" alt="Logo for home" />
                    <NavLink to="/"><p>回到首页</p></NavLink>
            </div>
            <div className='hide' id='back'>
                    <img className='back web-logo' src="../img/back.png" alt="Logo for a back button" />
                    <NavLink to="/"><p>返回上页</p></NavLink>
                    
            </div>
            <div id="write">
                    <img src="../img/edit.png" alt="Logo for write reviews" />
                    <NavLink to="/"><p>填写课评</p></NavLink>
            </div>
            <div id="login">
                    <img src="../img/log-in.png" alt="Logo for log-in" />
                    <NavLink to="/login"><p>用户登录</p></NavLink>
                    
            </div>
        </footer>
    ) 
}

export function BigFooter() {
    return (
        <div class='big-footer'>
            <img class = '' src="./img/original4.png" class="web-logo" alt="Logo for Course Radar" />
        </div>
    )
}