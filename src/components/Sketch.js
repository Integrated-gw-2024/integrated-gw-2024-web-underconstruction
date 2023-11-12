import React, { useEffect, useRef } from "react";
import Q5 from "../lib/q5.min.js";
import findObject from "../utils/findObject";
import World from "../features/dots/World/World.js";

let toggle = false;
const reg = /\b(\d+\.\d+)\b/g;

export default function Sketch(props) {
    let sketchRef = useRef();

    let dotsData;

    //ToMove(startX, startY, endX, endY, frame数, 揺れ, easing)
    //
    //イージングでoutを掛けてあげると終点近くでまとまるので最後のずれの問題が収まりやすい。

    const q5 = new Q5("this", sketchRef.current);

    let w = new World(q5, 600);

    console.log(w);

    let offsetX = 0;
    let offsetY = 0;

    let svgSize = [];
    let svgWidth,
        svgHeight = 0;
    let viewBox;

    if (props.dotsData) {
        dotsData = props.dotsData;
        const name = dotsData.charTn01Json.svg;

        viewBox = name._.viewBox;
        svgSize = viewBox.match(reg);
        svgWidth = parseFloat(svgSize[0]);
        svgHeight = parseFloat(svgSize[1]);

        offsetX = svgWidth / 2;
        offsetY = svgHeight / 2;
        w.setOffset(-offsetX, -offsetY);

        const dotsObject = findObject(name, "circle");
        w.addDot(dotsObject, q5);
    }
    console.log(dotsData);

    q5.mousePressed = () => {
        console.log(w);
        let dotsObject;
        let name = dotsData.d01Json.svgD01;
        if (toggle) {
            name = dotsData.char02Json.svg;
            dotsObject = findObject(name, "circle");
        } else {
            name = dotsData.char01Json.svg;
            dotsObject = findObject(name, "circle");
        }
        toggle = !toggle;

        console.log(name);
        viewBox = name._.viewBox;

        svgSize = viewBox.match(reg);
        svgWidth = parseFloat(svgSize[0]);
        svgHeight = parseFloat(svgSize[1]);

        offsetX = svgWidth / 2;
        offsetY = svgHeight / 2;
        w.setOffset(-offsetX, -offsetY);

        w.changeGraphic(dotsObject);
    };

    q5.setup = () => {
        q5.createCanvas(q5.windowWidth, q5.windowHeight);
        if (props.dotsData) {
            scheduleChange();
        }
    };

    q5.draw = () => {
        const scaleFactor = q5.min(q5.width / svgWidth, q5.height / svgHeight);
        q5.clear();
        q5.pushMatrix();
        //q5.translate(q5.width / 2 - (svgWidth/2), q5.height / 2 - (svgHeight/2));
        q5.translate(q5.width / 2, q5.height / 2);
        if(q5.width<q5.height){
            q5.scale(scaleFactor / 1.03);
        }else{
            q5.scale(scaleFactor / 1.3);
        }
        q5.fill("#FF625B");
        q5.stroke("#FD3238");
        q5.strokeWeight(0.5);
        w.update();
        w.display("DOTS");
        q5.popMatrix();
        /*
        q5.translate(q5.width/2,q5.height/2);
        q5.scale(q5.map(q5.mouseX,0,q5.width,0.1,20));
        q5.fill(0);
        q5.ellipse(0,0,10,10);
        */
    };

    q5.windowResized = () => {
        q5.resizeCanvas(q5.windowWidth, q5.windowHeight);
    };

    let num = 1;
    const scheduleChange = () => {
        setTimeout(() => {
            change(w, dotsData, num);
            num < 7 ? num++ : (num = 0);
            scheduleChange();
        }, 8000);
    };

    return <div ref={sketchRef} />;
}

function change(w, dotsData, num) {
    let svgSize = [];
    let svgWidth,
        svgHeight = 0;
    let viewBox;
    let offsetX = 0;
    let offsetY = 0;

    let dotsObject;
    let name = dotsData.d01Json.svgD01;

    console.log(num);

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

    toggle = !toggle;

    console.log(name);
    viewBox = name._.viewBox;

    svgSize = viewBox.match(reg);
    svgWidth = parseFloat(svgSize[0]);
    svgHeight = parseFloat(svgSize[1]);

    offsetX = svgWidth / 2;
    offsetY = svgHeight / 2;
    w.setOffset(-offsetX, -offsetY);

    w.changeGraphic(dotsObject);
}
