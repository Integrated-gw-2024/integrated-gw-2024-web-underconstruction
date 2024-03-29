import React, { useEffect, useRef, useState } from "react";
import Sketch from "../components/Sketch";
import GetDotsData from "../utils/GetDotsData";
import "../scss/style.scss";
import { Global, css } from "@emotion/react";
import GetColorSchemes from "../utils/GetColorSchemes";
import ExhibitionDetail from "../components/ExhibitionDetail/ExhibitionDetail";
import SEO from "../components/SEO";
let backgroundColor = { r: 255, g: 255, b: 255 };

const Index = () => {
    const [dotsData, setDotsData] = useState(0);
    const [elmHeight, setElmHeight] = useState(0);
    const [colorsNum, setColorsNum] = useState(0);
    const d = GetDotsData();
    const c = GetColorSchemes();

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
        if (!ignore) {
            backgroundColor = c.colorSchemesJson.colors[colorsNum].background;
            if (typeof document !== "undefined") {
                document.body.style.backgroundColor = `rgb(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b})`;
            }
        }
        return () => {
            ignore = true;
        };
    }, [colorsNum]);

    return (
        <>
            <Sketch dotsData={dotsData} setColorsNum={setColorsNum} />
            <Global
                style={css`
                    background-color: rgb(
                        ${backgroundColor.r},
                        ${backgroundColor.g},
                        ${backgroundColor.b}
                    );
                `}
            />
            <ExhibitionDetail setElmHeight={setElmHeight}/>
            <ExhibitionDetail />
            <ExhibitionDetail />
            <ExhibitionDetail />
            <ExhibitionDetail />
            <ExhibitionDetail />
        </>
    );
};

export default Index;

export function Head() {
    return (
        <>
            <link
                rel="stylesheet"
                href={`https://use.typekit.net/${process.env.ADOBE_FONTS_PROJECT_ID}.css`}
            />
            <style>
                {`
                body {font-family: "tt-commons-pro", "游ゴシック体", YuGothic, "游ゴシック", "Yu Gothic", sans-serif;}
                `}
            </style>
            <SEO />
        </>
    );
}
