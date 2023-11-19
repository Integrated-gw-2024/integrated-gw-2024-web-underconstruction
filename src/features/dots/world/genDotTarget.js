import { neko } from "../../../lib/neko-lib";
import DotTarget from "../DotTarget";

export default function genDotTarget(
    dotObject,
    currentDotTarget,
    duration,
    offsetX,
    offsetY,
    q5,
) {
    
    const cdt = currentDotTarget;
    let toSZ;
    if(dotObject._.r){
        toSZ = parseFloat(dotObject._.r);
    }else{
        toSZ = parseFloat(dotObject._.rx);
    }
    const toX = parseFloat(dotObject._.cx);
    const toY = parseFloat(dotObject._.cy);
    const fromX = parseFloat(cdt.position.x);
    const fromY = parseFloat(cdt.position.y);
    const fromSZ = parseFloat(cdt.sz);

    const obj = new DotTarget(
        fromX,
        fromY,
        toX + offsetX,
        toY + offsetY,
        duration,
        0.4,
        neko.Easing.easeOutSine,
        q5,
        fromSZ,
        toSZ
    );


    return obj;
}
