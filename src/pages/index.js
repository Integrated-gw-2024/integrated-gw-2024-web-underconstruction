import React, { useEffect, useState } from "react";
import Sketch from "../components/Sketch";
import GetDotsData from "../utils/GetDotsData";
import "../scss/style.scss";
import { Global, css } from "@emotion/react";

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

    const global = css`
        body {
            background-color: #fff0e3;
        }
    `;

    return (
        <>
            <Global styles={global} />
            <article className="text">
                <section className="margin--bottom--9percent--section">
                    <section
                        css={css`
                            margin-bottom: 26% !important;
                        `}
                    >
                        <p>
                            under construction...
                            <br />
                            準備中....
                        </p>
                    </section>
                    <section>
                        <p>
                            多摩美術大学
                            <br />
                            統合デザイン学科
                            <br />
                            卒業修了制作展2O24
                        </p>
                    </section>
                    <section
                        css={css`
                            margin-bottom: 16% !important;
                        `}
                    >
                        <p>
                            01. 18 - <br />
                            01. 21
                        </p>
                    </section>
                    <section>
                        <p>予約不要</p>
                        <p>No reservation required</p>
                    </section>
                </section>
                <section className="margin--bottom--9percent--section">
                    <section>
                        <p>TAMA ART UNIVERSITY</p>
                    </section>
                    <section>DEPARTMENT OF</section>
                    <section>
                        INTEGRATED
                        <br />
                        DESIGN
                        <br />
                        GRADUATION
                        <br />
                        SHOW
                    </section>
                    <section>KAMINOGE CAMPUS</section>
                </section>
            </article>
            <Sketch dotsData={dotsData} />
        </>
    );
};

export default IndexPage;

export const Head = () => {
    <>
        <meta name="robots" content="noindex" />
        <title>Home Page</title>;
    </>;
};
