import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const GetDotsData = () => {
    let data = useStaticQuery(graphql`
        query {
            d01Json {
                svgD01 {
                    _ {
                        viewBox
                    }
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
                    _ {
                        viewBox
                    }
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
                    _ {
                        viewBox
                    }
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
            charTn01Json {
                svg {
                    _ {
                        viewBox
                    }
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
            charOn01Json {
                svg {
                    _ {
                        viewBox
                    }
                    g {
                        g {
                            circle {
                                _ {
                                    cy
                                    cx
                                    r
                                }
                            }
                        }
                    }
                }
            }
            charGn01Json {
                svg {
                    _ {
                        viewBox
                    }
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
            charOn02Json {
                svg {
                    _ {
                        viewBox
                    }
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
            char2N01Json {
                svg {
                    _ {
                        viewBox
                    }
                    g {
                        g {
                            ellipse {
                                _ {
                                    cx
                                    cy
                                    rx
                                }
                            }
                        }
                    }
                }
            }
            char0N01Json {
                svg {
                    _ {
                        viewBox
                    }
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
            char2N02Json {
                svg {
                    _ {
                        viewBox
                    }
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
            char4N01Json {
                svg {
                    _ {
                        viewBox
                    }
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
        }
    `);

    return data;
};

export default GetDotsData;
