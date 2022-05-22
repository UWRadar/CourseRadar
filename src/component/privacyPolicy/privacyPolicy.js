import React, { Component } from "react";
var __html = require('./privacyPolicy.html.js');
var template = { __html: __html };

export default class PrivacyPolicy extends Component{

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
        return (<div>
            <span dangerouslySetInnerHTML={template} />
        </div>)
    }

}
