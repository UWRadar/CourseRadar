import PropTypes from "prop-types";

import styles from "./PopupAd.module.css";

function PopupAd({ dismiss }) {
	// temporarily hard-coded

	const detailsOnClick = () => {
		// window.open("https://mp.weixin.qq.com/s/C9jOj59gmsUtYVH4ueFojA");
		dismiss();
		localStorage.setItem("popupClicked", Date.now());
	};

	return (
		<div className={styles["very-important-message"]}>
			<img
				src="https://cdn.jsdelivr.net/gh/UWRadar/CourseRadar_AdImg/Img/OHCM%20Articles/MajorFair2024.jpg"
				alt="华大课友 2024 Major Fair 海报"
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
