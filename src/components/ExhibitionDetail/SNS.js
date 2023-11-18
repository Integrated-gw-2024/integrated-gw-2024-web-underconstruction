import React, { useEffect, useRef } from "react";
import InstagramLogo from "../../images/SNS/Instagram.svg";
import XLogo from "../../images/SNS/X.svg";
import noteLogo from "../../images/SNS/note.svg";

export default function SNS() {
    return (
        <div className="SNS">
            <a
                href="https://www.instagram.com/integrated_gw/"
                target="_blank"
                rel="noopener"
            >
                <img src={InstagramLogo} className="SNS-ig"/>
            </a>
            <a
                href="https://twitter.com/integrated_gw"
                target="_blank"
                rel="noopener"
            >
                <img src={XLogo} className="SNS-x"/>
            </a>
            <a href="https://note.com/900000" target="_blank" rel="noopener">
                <img src={noteLogo} className="SNS-note"/>
            </a>
        </div>
    );
}
