import React from "react";
import { neko } from "../lib/neko-lib";

const dots = [];
const dotsTarget = [];

export default function Sketch(p5) {
    let dotsData;
    p5.updateWithProps = (props) => {
        if (props.dotsData) {
            dotsData = props.dotsData;
            const dotsObject = findObject(dotsData, "circle");
            addDot(dotsObject, p5);
        }
    };

    //ToMove(startX, startY, endX, endY, frame数, 揺れ, easing)
    //
    //イージングでoutを掛けてあげると終点近くでまとまるので最後のずれの問題が収まりやすい。


    p5.setup = () => {
        p5.createCanvas(700, 700);
        p5.background(250);
    };

    p5.draw = () => {
        p5.background(200);
        for(const dt of dotsTarget){
            dt.update();
            dt.display();
            //console.log("[@]",dt);
        }
        for(const dot of dots){
            //dot.display();
        }
        
        p5.fill(100);
        
        p5.fill(0);
    };
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
        //console.log(dot);
        const toMove = new ToMove(
            Number(dot._.cx),
            Number(dot._.cy),
            500,
            500,
            600,
            10,
            neko.Easing.easeOutSine,
            p5
        );
        dots.push(toMove);
        //console.log("[adscsdca]",dots[dots.length-1])
    }
    for(let i=1;i<dots.length+1;i++){
        //console.log(dots[i]);
        dotsTarget.push(new Ball(0.02, dots[i-1], p5));
        //console.log(dotsTarget);
    }
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

        //console.log(toMove.position);

        this.easing = easing;
        this.toMove = toMove;
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
    }

    display() {
        this.p5.circle(this.position.x, this.position.y, 10);
    }
}

class ToMove {
    constructor(fromX, fromY, toX, toY, frame, swingRange, easing, p5) {
        console.log(fromX,fromY);
        this.p5 = p5;
        //randomwalk部分
        this.prepareFrame = Math.trunc(frame / 2);
        this.countFrame = 0;
        this.swingRange = swingRange;

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
            [fromX, fromY],
            [toX, toY],
            frame,
            easing
        );
        this.shuffleArray = {
            x: this.setupRandomWalkArray(),
            y: this.setupRandomWalkArray(),
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
    }

    display() {
        this.p5.circle(this.position.x, this.position.y, 10);
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
