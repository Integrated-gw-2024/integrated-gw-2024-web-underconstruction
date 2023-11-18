import React, { useEffect, useRef } from "react";
import Text from "./Text";
import Header from "./Header";
import SNS from "./SNS";

export default function ExhibitionDetail(props) {
    const elm = useRef();
    useEffect(() => {
        let isMounted = true;
        if (props.setElmHeight && isMounted) {
            props.setElmHeight(elm.current.getBoundingClientRect().height);
        }
        return () => {
            isMounted = false;
        };
    }, []);

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
