import React, { component } from "react"
import ReactHover, { Trigger, Hover } from "react-hover";
import TriggerComponent from "./TriggerComponent";
import HoverComponent from "./HoverComponent";

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: -400,
    shiftY: -400,
}

const LinearProgressBar = (props) => {
    const { bgcolor, completed, rating } = props;
    console.log(rating);
    const containerStyles = {
        height: 12,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 30,
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: "rgba(99, 70, 157, 1)",
        borderRadius: 'inherit',
        textAlign: 'right',
    }

    const labelStyles = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: "80%",
        margin:0,
        marginLeft: "3%"
    }

    return (
        <div style={{marginRight:"5%"}}>
            <span>
                {`${props.text}`}
                {props.showQuestion && 
                <ReactHover options={optionsCursorTrueWithMargin}>
                <Trigger type='trigger'>
                    <TriggerComponent/>
                </Trigger>
                <Hover type='hover'>
                    <HoverComponent rating={rating}/>
                </Hover>
                </ReactHover>
                }
            </span>
            <div className="linearBar">
                <div style={containerStyles}>

                    <div style={fillerStyles}>
                        
                    </div>

                </div>
                <p style={labelStyles}>
                    {`${props.content}`}
                </p>
            </div>
                
                
        </div>
        
    )
}

export default LinearProgressBar