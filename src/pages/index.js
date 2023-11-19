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
            <ExhibitionDetail setElmHeight={setElmHeight} />
            <ExhibitionDetail setElmHeight={setElmHeight} />
            <ExhibitionDetail setElmHeight={setElmHeight} />
            <ExhibitionDetail setElmHeight={setElmHeight} />
            <ExhibitionDetail setElmHeight={setElmHeight} />
            <ExhibitionDetail setElmHeight={setElmHeight} />
        </>
    );
};

export default Index;

export function Head() {
    return (
        <>
            <script>
                {`
                    {
                        (function(d) {
                            var config = {
                                kitId: 'qsq6yov',
                                scriptTimeout: 3000,
                                async: true
                            },
                            h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
                        })(document);
                    }
                `}
            </script>
            <SEO />
        </>
    );
}
