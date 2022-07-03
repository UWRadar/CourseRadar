import ImageStorage from "./ImageStorage";
import "./SideHoveringButtons.css"
import React from "react";
const SideHoveringButtons = () => {
    const backToTop = () => {
        window.scrollTo(0, 0);
    }

    let windowY = 0;

    window.addEventListener('scroll',()=> {windowY = window.scrollY})

    const scrollTopButton = () => {
        if (window.scrollY > 20){
            return (
                <div className="left-nav">
                    <img className="go-top" src={ImageStorage.backToTop} onClick={backToTop}/>
                </div>
            )
        }
        return null;
    }

    return (
        scrollTopButton()
    )


    // return (
    //     <div className="left-nav">
    //         <img className="go-top" src={ImageStorage.backToTop} onClick={backToTop}/>
    //     </div>
    // )
}

export default SideHoveringButtons;