import * as React from "react";
import Sketch from "../components/Sketch";
import { ReactP5Wrapper } from "@p5-wrapper/react";

const IndexPage = () => {
    return (
        <>
            <ReactP5Wrapper sketch={Sketch} />
        </>
    );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
