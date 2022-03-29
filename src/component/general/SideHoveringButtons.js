import ImageStorage from "./ImageStorage";
import "./SideHoveringButtons.css"
const SideHoveringButtons = () => {
    const backToTop = () => {
        window.scrollTo(0, 0);
    }
    return (
        <div className="left-nav">
                <img className="go-top" src={ImageStorage.backToTop} onClick={backToTop}/>
        </div>
    )
}

export default SideHoveringButtons;