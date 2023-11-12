import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";

export default function Text(props) {
    const elm = useRef();
    useEffect(() => {
        let isMounted = true;
        if (props.setElmHeight && isMounted) {
            props.setElmHeight(elm.current.getBoundingClientRect().height);
        }
        return () => {
            isMounted = false;
        };
    }, []);
    return (
        <article className="text" ref={elm}>
            <div className="textWrapper">
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
            </div>
        </article>
    );
}
