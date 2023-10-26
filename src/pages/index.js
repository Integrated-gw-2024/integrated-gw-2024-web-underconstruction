import React, { useEffect, useState } from "react";
import Sketch from "../components/Sketch";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import GetDotsData from "../components/GetDotsData";

const IndexPage = () => {
    const [dotsData, setDotsData] = useState(0);
    const d = GetDotsData();

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setDotsData(d);
        }
        return () => {
            isMounted = false;
        };
    }, []);

    console.log(dotsData);

    return (
        <>
            <ReactP5Wrapper sketch={Sketch} dotsData={dotsData} />
        </>
    );
};

export default IndexPage;

export const Head = () => {
    <>
        <title>Home Page</title>;
    </>;
};
