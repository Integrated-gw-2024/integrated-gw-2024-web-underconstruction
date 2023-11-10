import World from "../world";
import { neko } from "../../../lib/neko-lib";
import DotTarget from "../DotTarget";

export default function genDotTarget(
    dotObject,
    currentDotTarget,
    duration,
    q5
) {
    
    const cdt = currentDotTarget;
    const toSZ = parseFloat(dotObject._.r);
    const toX = parseFloat(dotObject._.cx);
    const toY = parseFloat(dotObject._.cy);
    const fromX = parseFloat(cdt.position.x);
    const fromY = parseFloat(cdt.position.y);
    const fromSZ = parseFloat(cdt.sz);


    const obj = new DotTarget(
        fromX,
        fromY,
        toX,
        toY,
        duration,
        0.4,
        neko.Easing.easeOutSine,
        q5,
        fromSZ,
        toSZ
    );


    return obj;
}
