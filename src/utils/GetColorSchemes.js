import { useStaticQuery, graphql } from "gatsby";

const GetColorSchemes = () => {
    let data = useStaticQuery(graphql`
        query {
            colorSchemesJson {
                colors {
                    background {
                        r
                        g
                        b
                    }
                    fill {
                        r
                        g
                        b
                    }
                    stroke {
                        b
                        g
                        r
                    }
                }
            }
        }
    `);

    return data;
};

export default GetColorSchemes;
