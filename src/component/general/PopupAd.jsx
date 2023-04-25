import PropTypes from "prop-types";

import styles from "./PopupAd.module.css";

function PopupAd({ dismiss }) {
	// temporarily hard-coded for Graduation Fair 2023

	const detailsOnClick = () => {
		window.open("https://mp.weixin.qq.com/s/MGgVtOQgnrHB5JV-QwlhDQ");
		dismiss();
		localStorage.setItem("popupClicked", Date.now());
	};

	return (
		<div className={styles["very-important-message"]}>
			<img
				src="https://cdn.jsdelivr.net/gh/UWRadar/CourseRadar_AdImg/Img/OHCM%20Articles/graduation_fair_popup.jpg"
				alt="5月3日华大课友毕业分享会"
			/>
			<button
				className={styles["major-button"]}
				onClick={detailsOnClick}>
				了解详情
			</button>
			<button
				className={styles["minor-button"]}
				type="button"
				onClick={dismiss}>
				下次一定
			</button>
		</div>
	);
}

PopupAd.propTypes = {
	dismiss: PropTypes.func.isRequired,
};

export default PopupAd;
