import React from "react";
import { neko } from "../lib/neko-lib";

const offset = 0;
const dots = [];
const dotsTarget = [];
const duration = 100;

export default function Sketch(p5) {
    let dotsData;
    p5.updateWithProps = (props) => {
        if (props.dotsData) {
            dotsData = props.dotsData;
            const dotsObject = findObject(dotsData.d01Json, "circle");
            addDot(dotsObject, p5);
        }
    };

    //ToMove(startX, startY, endX, endY, frame数, 揺れ, easing)
    //
    //イージングでoutを掛けてあげると終点近くでまとまるので最後のずれの問題が収まりやすい。

    let toggle = false;

    p5.mousePressed = () => {
        //console.clear();

        let dotsObject;
        if (toggle) {
            dotsObject = findObject(dotsData.char02Json, "circle");
        } else {
            dotsObject = findObject(dotsData.char01Json, "circle");
        }
        toggle = !toggle;

        changeGraphic(dotsObject,p5);

    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
    };

    p5.draw = () => {
        p5.translate((p5.width/2)-140, (p5.height/2)-200);
        p5.scale(3);
        p5.clear();
        p5.fill("#FF625B");
        p5.stroke("#FD3238");
        p5.strokeWeight(0.8);
        for (const dt of dotsTarget) {
            dt.update();
            dt.display();
        }
        p5.fill(0, 255, 255, 100);
        for (const dot of dots) {
            //dot.display();
        }

        p5.fill(0);
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }
}

function changeGraphic(dotsObject,p5) {
    const prevSize = dots.length;
    if (dotsObject.length > prevSize) {
        console.log("1");
        for (let i = prevSize; i < dotsObject.length; i++) {
            const fromIndex = Math.floor(Math.random() * prevSize);
            const toSZ = parseFloat(dotsObject[i - 1]._.r);
            const toX = parseFloat(dotsObject[i - 1]._.cx);
            const toY = parseFloat(dotsObject[i - 1]._.cy);
            const fromX = parseFloat(dots[fromIndex].position.x);
            const fromY = parseFloat(dots[fromIndex].position.y);
            const fromSZ = parseFloat(dots[fromIndex].sz);
            const toMove = new ToMove(
                fromX,
                fromY,
                toX + offset,
                toY + offset,
                duration,
                0.4,
                neko.Easing.easeOutSine,
                p5,
                fromSZ,
                toSZ
            );
            dots.push(toMove);
        }
        for (let i = 1; i < dots.length + 1; i++) {
            dotsTarget.push(new Ball(0.02, dots[i - 1], p5));
        }
    }
    for (let i = 0; i < prevSize; i++) {
        let x,
            y,
            toSZ = 0;
        if (dotsObject.length > i) {
            console.log("2");
            x = parseFloat(dotsObject[i]._.cx);
            y = parseFloat(dotsObject[i]._.cy);
            toSZ = parseFloat(dotsObject[i]._.r);
        } else {
            console.log("3");
            const index = Math.floor(Math.random() * dotsObject.length);
            x = parseFloat(dotsObject[index]._.cx);
            y = parseFloat(dotsObject[index]._.cy);
            toSZ = parseFloat(dotsObject[index]._.r);
            console.log(x,y);
        }

        const toMove = dots[i];
        const ball = dotsTarget[i];
        const swing = 1000;
        const easing = neko.Easing.easeOutSine;
        const toX = x + offset;
        const toY = y + offset;
        setTargetPosition(
            toMove,
            ball,
            duration,
            toX,
            toY,
            swing,
            easing,
            toSZ
        );
    }
}

function findObject(obj, word) {
    const keys = Object.keys(obj);
    let findObj = null;
    for (const key of keys) {
        if (typeof obj[key] === "object") {
            if (key === word) {
                findObj = obj[key];
                return findObj;
            } else {
                const result = findObject(obj[key], word);
                if (result != null) {
                    return result;
                }
            }
        }
    }
    return findObj;
}

function addDot(dotsObject, p5) {
    for (const dot of dotsObject) {
        const x = parseFloat(dot._.cx);
        const y = parseFloat(dot._.cy);
        const fromSZ = parseFloat(dot._.r);
        const toMove = new ToMove(
            x + offset,
            y + offset,
            x + offset,
            y + offset,
            duration,
            0.4,
            neko.Easing.easeOutSine,
            p5,
            fromSZ,
            fromSZ
        );
        dots.push(toMove);
    }
    for (let i = 1; i < dots.length + 1; i++) {
        dotsTarget.push(new Ball(0.02, dots[i - 1], p5));
    }
}

function setTargetPosition(
    toMove,
    ball,
    duration,
    toX,
    toY,
    swing,
    easing,
    toSZ
) {
    toMove.swingRage = swing;
    toMove.countFrame = 0;
    toMove.prepareFrame = Math.trunc(duration / 2);

    toMove.position = {
        x: toMove.position.x,
        y: toMove.position.y,
    };

    toMove.fromPosition = {
        x: toMove.position.x,
        y: toMove.position.y,
    };
    toMove.toPosition = {
        x: toX,
        y: toY,
    };

    toMove.fromSZ = toMove.sz;
    toMove.toSZ = toSZ;

    toMove.tween = new neko.FrameTween(
        [toMove.fromPosition.x, toMove.fromPosition.y, toMove.fromSZ],
        [toMove.toPosition.x, toMove.toPosition.y, toMove.toSZ],
        duration,
        easing
    );
}
class Ball {
    constructor(easing, toMove, p5) {
        this.p5 = p5;
        this.position = {
            x: toMove.fromPosition.x,
            y: toMove.fromPosition.y,
        };

        this.targetPosition = {
            x: toMove.position.x,
            y: toMove.position.y,
        };

        this.easing = easing;
        this.toMove = toMove;

        this.sz = toMove.fromSZ;
        this.targetSZ = toMove.toSZ;
    }

    debug() {
        //console.log("[toMove]",this.toMove);
        //console.log("[toMove.fromSZ]",this.toMove.fromSZ);
        //console.log("[toMove.sz]",this.toMove.sz);
        //console.log("[this.sz]",this.sz);
        //console.log("[this.targetSZ]",this.targetSZ);
    }

    update() {
        this.toMove.update();
        this.targetPosition = {
            x: this.toMove.position.x,
            y: this.toMove.position.y,
        };
        this.position.x =
            this.position.x +
            (this.targetPosition.x - this.position.x) * this.easing;
        this.position.y =
            this.position.y +
            (this.targetPosition.y - this.position.y) * this.easing;
        this.targetSZ = this.toMove.toSZ;
        this.sz = this.sz + (this.targetSZ - this.sz) * this.easing;
    }

    display() {
        this.p5.circle(this.position.x, this.position.y, this.sz * 2);
    }
}

class ToMove {
    constructor(
        fromX,
        fromY,
        toX,
        toY,
        frame,
        swingRange,
        easing,
        p5,
        fromSZ,
        toSZ
    ) {
        this.p5 = p5;
        //randomwalk部分
        this.prepareFrame = Math.trunc(frame / 2);
        this.countFrame = 0;
        this.swingRange = swingRange;

        this.fromSZ = fromSZ;
        this.toSZ = toSZ;
        this.sz = fromSZ;

        this.fromPosition = {
            x: fromX,
            y: fromY,
        };

        this.toPosition = {
            x: toX,
            y: toY,
        };

        //globalは普通に座標を
        this.globalPosition = {
            x: 0,
            y: 0,
        };

        //localはランダムウォークを管理
        this.localPosition = {
            x: 0,
            y: 0,
        };

        //globalとlocalの合計値
        this.position = {
            x: 0,
            y: 0,
        };

        this.tween = new neko.FrameTween(
            [fromX, fromY, fromSZ],
            [toX, toY, toSZ],
            frame,
            easing
        );
        this.shuffleArray = {
            x: this.setupRandomWalkArray(),
            y: this.setupRandomWalkArray(),
            sz: this.setupRandomWalkArray(),
        };
    }

    setupRandomWalkArray() {
        // ランダム数値配列（mapを有効にするため一旦0で初期化）
        const deltaXArr = new Array(this.prepareFrame).fill(0).map(() => {
            return Math.random() * this.swingRange;
        });
        const deltaXArr2 = this.double(deltaXArr);
        const result = this.shuffle(deltaXArr2);

        return result;
    }

    update() {
        this.tween.update();
        this.globalPosition.x = this.tween.getValues()[0];
        this.globalPosition.y = this.tween.getValues()[1];
        if (this.countFrame < this.shuffleArray.x.length) {
            this.localPosition.x += this.shuffleArray.x[this.countFrame];
            this.localPosition.y += this.shuffleArray.y[this.countFrame];
            this.countFrame++;
        }

        this.position.x = this.globalPosition.x + this.localPosition.x;
        this.position.y = this.globalPosition.y + this.localPosition.y;
        this.sz = this.tween.getValues()[2];
    }

    display() {
        this.p5.circle(this.position.x, this.position.y, this.sz);
    }

    double(arr) {
        let ret = [];

        arr.forEach((num) => {
            ret.push(num);
            ret.push(-num);
        });

        return ret;
    }

    // Fisher–Yatesアルゴリズムによる配列シャッフル
    shuffle(arr) {
        let ret = [].concat(arr);

        for (let i = ret.length - 1; i > 0; i--) {
            let r = Math.floor(Math.random() * (i + 1));
            let tmp = ret[i];
            ret[i] = ret[r];
            ret[r] = tmp;
        }

        return ret;
    }
}
