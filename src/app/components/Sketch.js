"use client"

import React, { useRef, useEffect } from "react";
import Q5 from "q5";

function Sketch() {
    let sketchRef = useRef();

    let q5 = new Q5("this",sketchRef.current);
    
    q5.setup = function(){
        q5.createCanvas(800,100);
    }
    q5.draw = function(){
        q5.ellipse(this.mouseX,this.mouseY,10,10);
    }

    return <div ref={sketchRef}></div>;
}

export default Sketch;
