import React, { useEffect, useRef, useState } from "react";
import Sketch from "../components/Sketch";
import GetDotsData from "../utils/GetDotsData";
import "../scss/style.scss";
import { Global, css } from "@emotion/react";
import Text from "../components/Text";

const IndexPage = () => {
    const [dotsData, setDotsData] = useState(0);
    const [elmHeight, setElmHeight] = useState(0);
    const d = GetDotsData();

    const scrollEvent = new CustomEvent("scrollback");

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setDotsData(d);
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", moveToStart);
            return () => window.removeEventListener("scroll", moveToStart);
        }
        return () => null;
    });

    const moveToStart = () => {
        if (window.scrollY > elmHeight * 4) {
            window.scroll({ top: 1, behavior: "instant" });
            window.dispatchEvent(scrollEvent);
        }
    };

    const global = css`
        body {
            background-color: #fff0e3;
        }
    `;

    return (
        <div>
            <Sketch dotsData={dotsData}/>
            <Global styles={global} />
            <Text setElmHeight={setElmHeight} />
            <Text />
            <Text />
            <Text />
            <Text />
            <Text />
        </div>
    );
};

export default IndexPage;

export const Head = () => {
    <>
        <meta name="robots" content="noindex" />
        <title>Home Page</title>;
    </>;
};
