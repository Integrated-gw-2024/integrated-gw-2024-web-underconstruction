import React, { useEffect, useRef } from "react";
import Q5 from "../lib/q5.min.js";
import findObject from "../utils/findObject";
import World from "../features/dots/world";

export default function Sketch(props) {
    let sketchRef = useRef();

    let dotsData;

    //ToMove(startX, startY, endX, endY, frame数, 揺れ, easing)
    //
    //イージングでoutを掛けてあげると終点近くでまとまるので最後のずれの問題が収まりやすい。
    let toggle = false;

    const q5 = new Q5("this", sketchRef.current);
    let w = new World(q5,800);

    console.log(w);

    if (props.dotsData) {
        dotsData = props.dotsData;
        const dotsObject = findObject(dotsData.d01Json, "circle");
        w.addDot(dotsObject, q5);
    }

    q5.mousePressed = () => {
        console.log(w);
        let dotsObject;
        if (toggle) {
            dotsObject = findObject(dotsData.char02Json, "circle");
        } else {
            dotsObject = findObject(dotsData.char01Json, "circle");
        }
        toggle = !toggle;

        w.changeGraphic(dotsObject, q5,w);
    };

    q5.setup = () => {
        q5.createCanvas(q5.windowWidth, q5.windowHeight);
    };

    q5.draw = () => {
        q5.clear();
        q5.translate(q5.width / 2 - 140, q5.height / 2 - 200);
        q5.scale(2);
        //q5.background(255);
        q5.fill("#FF625B");
        q5.stroke("#FD3238");
        q5.strokeWeight(0.8);
        //q5.ellipse(q5.mouseX, q5.mouseY, 10, 10);
        w.update();
        w.display("DOTS");
        //w.display("TARGET");
        
        q5.fill(0);
    };

    q5.windowResized = () => {
        q5.resizeCanvas(q5.windowWidth, q5.windowHeight);
    };

    return <div ref={sketchRef} />;
}
