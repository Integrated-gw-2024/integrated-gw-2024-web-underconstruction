import { neko } from "../../lib/neko-lib";

export default function setTargetPosition(
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