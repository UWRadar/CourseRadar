import React, { Component } from "react"
import "./CourseCard.css"
const CourseCard = (props) => {
    return (
        <div>
            <div class="recom-cards" aria-label="recommendation">
                <div class="course-title">
                    <div class="course-title-wrap">
                        <p>INFO 340</p>
                    </div>
                </div>
                <div class="recom-description">
                    <h1>Introduction to the web design</h1>
                    <div class="describtion-tags">
                        <div class="tag qsr">
                            <div class="tooltips" id="QSR">
                                <p>QSR</p>
                                <span class="tooltiptext"> Quantitative and Symbolic Reasoning</span>
                            </div>
                           
                        </div>
                        <div class="tag qsr">
                            <div class="tooltips" id="NW">
                                <p>NW</p>
                                <span class="tooltiptext"> Natural World</span>
                            </div>
                        </div>
{/*                         <div class="tag qsr">
                            <div class="tooltips" id="C">
                                <p>C</p>
                                <span class="tooltiptext"> English Composition</span>
                            </div>
                        </div>

                        <div class="tag qsr">
                            <div class="tooltips" id="W">
                                <p>W</p>
                                <span class="tooltiptext"> Writing</span>
                            </div>
                        </div>

                        <div class="tag qsr">
                            <div class="tooltips" id="DIV">
                            <p>DIV</p>
                                <span class="tooltiptext"> Diversity</span>
                            </div>
                        </div>

                        <div class="tag qsr">
                            <div class="tooltips" id="IS">
                                <p>I&S</p>
                                <span class="tooltiptext"> Individuals and Societies</span>
                            </div>
                        </div>

                        <div class="tag qsr">
                            <div class="tooltips" id="VLPA">
                                <p>VLPA</p>
                                <span class="tooltiptext">  Visual, Literary, and Performing Arts</span>
                            </div>
                        </div>
 */}                            
                        <div class="tag credit">
                            <div class="tooltips" id="5cre">
                                <p>5 </p>
                                <span class="tooltiptext"> 5 Credits</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard