import React, { useEffect, useRef } from "react";
import Q5 from "../lib/q5.min.js";
import findObject from "../utils/findObject";
import World from "../features/dots/World/World.js";
import shuffleArray from "../utils/shuffleArray.js";
import { neko } from "../lib/neko-lib.js";
import GetColorSchemes from "../utils/GetColorSchemes.js";
import ColorSchemes from "../utils/ColorSchemes.js";

let toggle = false;
const reg = /\b(\d+\.\d+)\b/g;
let num = 1;
let svgWidth,
    svgHeight = 0;
let prevScale = 1;
let dotsScaleValue;
let dotsScale;

export default function Sketch(props) {
    let sketchRef = useRef();
    const d = GetColorSchemes();
    const colors = d.colorSchemesJson.colors;
    let isFirstColorChange = true;

    useEffect(() => {
        let dotsData;

        const graphicTransitionTime = 7000;
        //ToMove(startX, startY, endX, endY, frame数, 揺れ, easing)
        //
        //イージングでoutを掛けてあげると終点近くでまとまるので最後のずれの問題が収まりやすい。
        const q5 = new Q5("this", sketchRef.current);

        let w = new World(q5, graphicTransitionTime * 0.09);

        let offsetX = 0;
        let offsetY = 0;

        let svgSize = [];
        let viewBox;

        const initDots = () => {
            if (props.dotsData) {
                w = null;
                w = new World(q5, graphicTransitionTime * 0.09);
                dotsData = props.dotsData;
                const name = dotsData.charTn01Json.svg;

                viewBox = name._.viewBox;
                svgSize = viewBox.match(reg);
                svgWidth = parseFloat(svgSize[0]);
                svgHeight = parseFloat(svgSize[1]);
                prevScale = q5.min(
                    q5.windowWidth / svgWidth,
                    q5.windowHeight / svgHeight
                );
                dotsScale = rescale(svgWidth, svgHeight, q5);
                console.log(svgWidth);

                offsetX = svgWidth / 2;
                offsetY = svgHeight / 2;
                w.setOffset(-offsetX, -offsetY);

                const dotsObject = findObject(name, "circle");
                w.addDot(dotsObject, q5);
            }
        };

        q5.setup = () => {
            q5.createCanvas(q5.windowWidth, q5.windowHeight);

            if (props.dotsData) {
                scheduleChange();
            }
        };

        initDots();

        const index = Math.floor(Math.random() * colors.length);
        props.setColorsNum(index);
        let prevCol = ColorSchemes(colors[index], q5);
        let nowCol = prevCol;

        let amt = new neko.FrameTween(0, 1, 100, neko.Easing.easeOutSine);
        q5.draw = () => {
            amt.update();
            if (dotsScale) {
                dotsScale.update();
                dotsScaleValue = dotsScale.getValues()[0];
            }

            const fillColor = q5.lerpColor(
                prevCol.fill,
                nowCol.fill,
                amt.getValues()[0]
            );
            const strokeColor = q5.lerpColor(
                prevCol.stroke,
                nowCol.stroke,
                amt.getValues()[0]
            );

            q5.clear();
            q5.pushMatrix();
            //q5.translate(q5.width / 2 - (svgWidth/2), q5.height / 2 - (svgHeight/2));
            let scale = 1;
            q5.translate(q5.width / 2, q5.height / 2);
            if (q5.width < q5.height) {
                scale = dotsScaleValue / 1.2;
            } else {
                scale = dotsScaleValue / 1.3;
            }
            q5.fill(fillColor);
            q5.stroke(strokeColor);

            //q5.fill("#FF625B");
            //q5.stroke("#FD3238");
            q5.strokeWeight(1);
            w.update();
            w.display("DOTS", scale);
            q5.popMatrix();
        };

        const isBrowser = typeof window !== "undefined";
        if (isBrowser) {
            window.addEventListener("resize", () => {
                q5.resizeCanvas(q5.windowWidth, q5.windowHeight);
            });

            window.addEventListener("scrollback", () => {
                prevCol = nowCol;
                const index = Math.floor(Math.random() * colors.length);
                props.setColorsNum(index);
                nowCol = ColorSchemes(colors[index], q5);
                amt = new neko.FrameTween(0, 1, 100, neko.Easing.easeOutSine);
            });

            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    reset();
                }
            });
        }

        let schedule;

        const reset = () => {
            clearTimeout(schedule);
            num = 1;
            svgWidth = 1;
            svgHeight = 1;
            prevScale = 1;
            dotsScaleValue = 1;
            dotsScale = 1;
            initDots();
            scheduleChange();
        };

        const scheduleChange = () => {
            schedule = setTimeout(() => {
                change(w, dotsData, num);
                num < 7 ? num++ : (num = 0);
                if ((!isFirstColorChange && num == 1) || num == 5) {
                    prevCol = nowCol;
                    const index = Math.floor(Math.random() * colors.length);
                    props.setColorsNum(index);
                    nowCol = ColorSchemes(colors[index], q5);
                    amt = new neko.FrameTween(
                        0,
                        1,
                        100,
                        neko.Easing.easeOutSine
                    );
                }

                dotsScale = rescale(svgWidth, svgHeight, q5);
                isFirstColorChange = false;
                scheduleChange();
            }, graphicTransitionTime);
        };

        q5.mousePressed = () => {
            reset();
        };
    }, [props.dotsData]);

    return <div ref={sketchRef} />;
}

function change(w, dotsData, num) {
    let svgSize = [];
    let viewBox;
    let offsetX = 0;
    let offsetY = 0;

    let dotsObject;
    let name = dotsData.d01Json.svgD01;

    switch (num) {
        case 0:
            console.log("T");
            name = dotsData.charTn01Json.svg;
            break;
        case 1:
            console.log("O");
            name = dotsData.charOn01Json.svg;
            break;
        case 2:
            console.log("G");
            name = dotsData.charGn01Json.svg;
            break;
        case 3:
            console.log("O");
            name = dotsData.charOn02Json.svg;
            break;
        case 4:
            console.log("2");
            name = dotsData.char2N01Json.svg;
            break;
        case 5:
            console.log("0");
            name = dotsData.char0N01Json.svg;
            break;
        case 6:
            console.log("2");
            name = dotsData.char2N02Json.svg;
            break;
        case 7:
            console.log("4");
            name = dotsData.char4N01Json.svg;
            break;
        default:
            name = dotsData.d01Json.svgD01;
            console.error("[change]", "範囲外の番号が指定されています。");
    }
    dotsObject = findObject(name, "circle");
    if (!dotsObject) {
        dotsObject = findObject(name, "ellipse");
    }
    dotsObject = shuffleArray(dotsObject);

    toggle = !toggle;

    viewBox = name._.viewBox;

    svgSize = viewBox.match(reg);
    svgWidth = parseFloat(svgSize[0]);
    svgHeight = parseFloat(svgSize[1]);

    offsetX = svgWidth / 2;
    offsetY = svgHeight / 2;
    w.setOffset(-offsetX, -offsetY);

    w.changeGraphic(dotsObject);
}

function rescale(svgWidth, svgHeight, q5) {
    const scale = q5.min(
        q5.windowWidth / svgWidth,
        q5.windowHeight / svgHeight
    );

    let amt = new neko.FrameTween(
        prevScale,
        scale,
        200,
        neko.Easing.easeOutBack
    );

    prevScale = scale;

    return amt;
}
