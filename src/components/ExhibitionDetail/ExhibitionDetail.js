import React, { useEffect, useRef } from "react";
import Text from "./Text";
import Header from "./Header";
import SNS from "./SNS";

export default function ExhibitionDetail(props) {
    const elm = useRef();

    useEffect(() => {
        let isMounted = true;
        if (props.setElmHeight && isMounted) {
            window.addEventListener("resize", resizeWindow);
            props.setElmHeight(elm.current.getBoundingClientRect().height);
        }
        return () => {
            window.removeEventListener("resize",resizeWindow);
            isMounted = false;
        };
    }, []);

    const resizeWindow = () => {
        props.setElmHeight(elm.current.getBoundingClientRect().height);
    }

    return (
        <div ref={elm} className="ExhibitionDetail">
            <Header />
            <div className="wrapper">
                <Text />
                <SNS />
            </div>
        </div>
    );
}
