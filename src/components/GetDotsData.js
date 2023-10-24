import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const GetDotsData = () => {
    let data = useStaticQuery(graphql`
        query {
            dataJson {
                svgD01 {
                    g {
                        g {
                            circle {
                                _ {
                                    cx
                                    cy
                                    fill
                                    r
                                    stroke
                                    stroke_width
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    return data;
}

export default GetDotsData;