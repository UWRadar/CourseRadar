import ImageStorage from "./ImageStorage";
import "./SideHoveringButtons.css";

function SideHoveringButtons() {
    const backToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className="left-nav">
            <img className="go-top" src={ImageStorage.backToTop} alt="Back to Top" role="button" onClick={backToTop} />
        </div>
    );
}

export default SideHoveringButtons;
