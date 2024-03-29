import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routing from "./component/routing/Route";

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

setTimeout(() => { // make sure that it will not be removed by extensions
	document.oncopy = () => {
		return false;
	};
}, 1000);

if (window.self !== window.top) { // is loaded by Chrome extension
	document.documentElement.classList.add("extension");
}

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
