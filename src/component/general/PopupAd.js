import "./PopupAd.css";

function PopupAd({ dismiss }) {
	// temporarily hard-coded for Major Fair 2022

	function detailsOnClick() {
		window.open("https://mp.weixin.qq.com/s/dh9EO21IX-ZMS-t5JOAaGQ");
		dismiss();
		localStorage.setItem("popupClicked", Date.now());
	}

	return <div className="very-important-message">
		<img
			src="https://cdn.jsdelivr.net/gh/UWRadar/CourseRadar_AdImg/Img/OHCM%20Articles/MajorFair2022Popup.png"
			alt="第六届华大课友 Major Fair 将于 2022 年 11 月 8 日在 HUB South Ballroom 举行，等你来哟"
		/>
		<button className="major-button" onClick={detailsOnClick}>了解详情</button>
		<button className="minor-button" type="button" onClick={dismiss}>下次一定</button>
	</div>
}

export default PopupAd;
