export default class Dot {
    constructor(easing, toMove, q5) {
        this.q5 = q5;
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

    toPosition(x,y) {
        this.targetPosition = {
            x: x,
            y: y,
        }
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
        this.q5.circle(this.position.x, this.position.y, this.sz * 2);
    }
}