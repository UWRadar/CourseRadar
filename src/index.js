import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routing from './component/routing/Route'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (
  navigator.userAgent.includes("MicroMessenger/") ||
  navigator.userAgent.includes("QQ/")
) {
  const newDiv = document.createElement("div");
  const newTitle = document.createElement("h3");
  const newUrlDiv = document.createElement("div");
  const newImg = new Image();
  newDiv.classList.add("full-screen");
  newTitle.innerText = "如需浏览，请使用浏览器访问";
  newUrlDiv.innerText = "https://uwclassmate.com/";
  newImg.src = "https://cdn.jsdelivr.net/gh/kujian/weixinTip/live_weixin.png";
  newDiv.appendChild(newTitle);
  newDiv.appendChild(newUrlDiv);
  newDiv.appendChild(newImg);
  document.body.appendChild(newDiv);
}
