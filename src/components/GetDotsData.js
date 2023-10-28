import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const GetDotsData = () => {
    let data = useStaticQuery(graphql`
        query {
            d01Json {
                svgD01 {
                    g {
                        g {
                            circle {
                                _ {
                                    cx
                                    cy
                                    r
                                }
                            }
                        }
                    }
                }
            }
            char01Json {
                svg {
                    g {
                        circle {
                            _ {
                                cx
                                cy
                                r
                            }
                        }
                    }
                }
            }
            char02Json {
                svg {
                    g {
                        circle {
                            _ {
                                cx
                                cy
                                r
                            }
                        }
                    }
                }
            }
        }
    `);

    return data;
};

export default GetDotsData;
