import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routing from "./component/routing/Route";
import reportWebVitals from "./reportWebVitals";

// David Xie: Add react-redux dependency for cross-component state management, which is needed for search bar communicate with search result page
import { Provider } from "react-redux";
import store from "./controller/ReduxStore";

ReactDOM.render(
    // David Xie: Add react-redux dependency for cross-component state management

    <React.StrictMode>
        <Provider store={store}>
            <Routing />
        </Provider>
    </React.StrictMode>
    ,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

setTimeout(() => { // make sure that it will not be removed by extensions
    document.oncopy = () => false;
}, 1000);
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
