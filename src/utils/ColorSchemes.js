export default function ColorSchemes(colorSchemes,q5) {
    const fillColor = colorSchemes.fill;
    const strokeColor = colorSchemes.stroke;
    const bgColor = colorSchemes.background;

    return{
        fill: q5.color(fillColor.r, fillColor.g, fillColor.b),
        stroke: q5.color(strokeColor.r, strokeColor.g, strokeColor.b),
        background: q5.color(bgColor.r, bgColor.g, bgColor.b),
    };
}