import React from "react";
import { css } from "@emotion/react";

export default function Text() {
    return (
        <article className="text">
            <div className="textWrapper">
                <section className="margin--bottom--9percent--section">
                    <section
                        css={css`
                            margin-bottom: 8.1vh !important;
                        `}
                    >
                        <p>
                            準備中
                            <br />
                            coming soon...
                        </p>
                    </section>
                    <section css={css`
                            z-index: 999999999 !important;
                            position: sticky;
                        `}>
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
                            margin-bottom: 5.2vh !important;
                            z-index: 999999999 !important;
                            position: sticky;
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
                    <section
                        css={css`
                            z-index: 999999999 !important;
                            position: sticky;
                        `}
                    >
                        <p>TAMA ART UNIVERSITY</p>
                    </section>
                    <section>DEPARTMENT OF</section>
                    <section
                        css={css`
                            z-index: 999999999 !important;
                            position: sticky;
                            margin-bottom: 4% !important;
                        `}
                    >
                        INTEGRATED
                        <br />
                        DESIGN
                    </section>
                    <section
                        css={css`
                            margin-bottom: 18%;
                            z-index: 999999999 !important;
                            position: sticky;
                        `}
                    >
                        GRADUATION
                        <br />
                        SHOW 2024
                    </section>
                    <section css={css`margin-bottom:unset !important`}>KAMINOGE CAMPUS</section>
                </section>
            </div>
        </article>
    );
}
