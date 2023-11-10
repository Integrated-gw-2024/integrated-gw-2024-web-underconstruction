import { neko } from "../../lib/neko-lib";
import Dot from "./Dot";
import DotTarget from "./DotTarget";
import setTargetPosition from "./setTargetPosition";
import genDotTarget from "./world/addDotTarget";

export default class World {
    #dots;
    #dotsTarget;
    #q5;
    #isFirstCall;

    constructor(q5, duration = 100, offset = 100) {
        this.#dots = [];
        this.#dotsTarget = [];
        this.#q5 = q5;
        this.duration = duration;
        this.offset = offset;
        this.#isFirstCall = true;
    }

    getDotsTarget(index) {
        return this.#dotsTarget[index - 1];
    }

    getDot(index) {
        return this.#dots[index - 1];
    }

    changeGraphic(dotsObject) {
        const prevSize = this.#dotsTarget.length;
        if (dotsObject.length > prevSize) {
            for (let i = prevSize; i < dotsObject.length; i++) {
                const randomIndex = (Math.floor(Math.random() * prevSize))+1;
                const currentDotTarget = this.getDotsTarget(randomIndex);
                const dt = genDotTarget(
                    dotsObject[i-1],
                    currentDotTarget,
                    this.duration,
                    this.#q5
                );
                this.#dotsTarget.push(dt);
            }
            for (let i = 1; i < this.#dotsTarget.length + 1; i++) {
                this.#dots.push(
                    new Dot(0.02, this.#dotsTarget[i - 1], this.#q5)
                );
            }
        }

        for (let i = 0; i < prevSize; i++) {
            let x,
                y,
                toSZ = 0;
            if (dotsObject.length > i) {
                x = parseFloat(dotsObject[i]._.cx);
                y = parseFloat(dotsObject[i]._.cy);
                toSZ = parseFloat(dotsObject[i]._.r);
            } else {
                const index = Math.floor(Math.random() * dotsObject.length);
                x = parseFloat(dotsObject[index]._.cx);
                y = parseFloat(dotsObject[index]._.cy);
                toSZ = parseFloat(dotsObject[index]._.r);
                console.log(x, y);
            }

            const toMove = this.#dotsTarget[i];
            const ball = this.#dots[i];
            const swing = 1000;
            const easing = neko.Easing.easeOutSine;
            const toX = x + this.offset;
            const toY = y + this.offset;

            //this.#dotsTarget[i].toPosition(toX, toY);

            setTargetPosition(
                toMove,
                ball,
                this.duration,
                toX,
                toY,
                swing,
                easing,
                toSZ
            );
        }
    }

    addDot(dotsObject) {
        for (const dot of dotsObject) {
            const x = parseFloat(dot._.cx);
            const y = parseFloat(dot._.cy);
            const fromSZ = parseFloat(dot._.r);
            const toMove = new DotTarget(
                x + this.offset,
                y + this.offset,
                x + this.offset,
                y + this.offset,
                this.duration,
                0.4,
                neko.Easing.easeOutSine,
                this.#q5,
                fromSZ,
                fromSZ
            );
            this.#dotsTarget.push(toMove);
        }
        for (let i = 1; i < this.#dotsTarget.length + 1; i++) {
            this.#dots.push(new Dot(0.02, this.#dotsTarget[i - 1], this.#q5));
        }
    }

    display(displayTarget) {
        if (displayTarget == "DOTS") {
            for (const dot of this.#dots) {
                dot.display();
            }
        } else if (displayTarget == "TARGET") {
            for (const dt of this.#dotsTarget) {
                dt.display();
            }
        } else {
            if (this.#isFirstCall) {
                console.error(
                    "[World] displayの引数が不正です。存在している対象を引数に渡してください。"
                );
                this.#isFirstCall = false;
            }
        }
    }

    update() {
        for (const dot of this.#dots) {
            dot.update();
        }
        for (const dt of this.#dotsTarget) {
            dt.update();
        }
    }
}