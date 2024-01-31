import PropTypes from "prop-types";

import styles from "./PopupAd.module.css";

function PopupAd({ dismiss }) {
	// temporarily hard-coded

	const detailsOnClick = () => {
		window.open("https://mp.weixin.qq.com/s/3IAT7eYmUe-wNj5LRGBIyw");
		dismiss();
		localStorage.setItem("popupClicked", Date.now());
	};

	return (
		<div className={styles["very-important-message"]}>
			<img
				src="https://cdn.jsdelivr.net/gh/UWRadar/CourseRadar_AdImg/Img/OHCM%20Articles/Puzzle2024.jpg"
				alt="2月15日校园寻宝活动"
			/>
			<button
				className={styles["major-button"]}
				onClick={detailsOnClick}>
				好
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
