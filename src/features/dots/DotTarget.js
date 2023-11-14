import { neko } from "../../lib/neko-lib";

export default class DotTarget {
    constructor(
        fromX,
        fromY,
        toX,
        toY,
        frame,
        swingRange,
        easing,
        q5,
        fromSZ,
        toSZ
    ) {
        this.q5 = q5;
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

    setupRandomWalkArray(frame = this.prepareFrame) {
        // ランダム数値配列（mapを有効にするため一旦0で初期化）
        const deltaXArr = new Array(frame).fill(0).map(() => {
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
        this.q5.fill(0,0,255);
        this.q5.circle(this.position.x, this.position.y, this.sz);
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
