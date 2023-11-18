import React, { useEffect, useRef, useState } from "react";
import Sketch from "../components/Sketch";
import GetDotsData from "../utils/GetDotsData";
import "../scss/style.scss";
import { Global, css } from "@emotion/react";
import Text from "../components/Text";
import Header from "../components/Header";
import SNS from "../components/SNS";
import GetColorSchemes from "../utils/GetColorSchemes";

const IndexPage = () => {
    const [dotsData, setDotsData] = useState(0);
    const [elmHeight, setElmHeight] = useState(0);
    const [colorsNum, setColorsNum] = useState(0);
    const d = GetDotsData();
    const c = GetColorSchemes();
    let backgroundColor = {r:255,g:255,b:255};

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


    useEffect(() => {
        let ignore = false;
        if (!ignore) {;
            backgroundColor = c.colorSchemesJson.colors[colorsNum].background
            document.body.style.backgroundColor = `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b})`;
        }
        return () => {
            ignore = true;
        };
    }, [colorsNum]);


    return (
        <>
            <Sketch dotsData={dotsData} setColorsNum={setColorsNum} />
            <Global style={css`
                background-color: rgb(
                    ${backgroundColor.r},
                    ${backgroundColor.g},
                    ${backgroundColor.b}
                );
            `} />
            <div>
                <Header />
                <div className="wrapper">
                    <Text setElmHeight={setElmHeight} />
                    <SNS />
                </div>
            </div>
            <Header />
            <Text />
            <Header />
            <Text />
            <Text />
            <Text />
            <Text />
        </>
    );
};

export default IndexPage;

export const Head = () => {
    <>
        <meta name="robots" content="noindex" />
        <title>Home Page</title>;
    </>;
};
