/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    pathPrefix: `/gw24`,
    siteMetadata: {
        title: `integrated-gs-web-underconstruction`,
        siteUrl: `https://integrated.jp/gw24/`,
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-emotion",
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        "gatsby-plugin-mdx",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "pages",
                path: "./src/pages/",
            },
            __key: "pages",
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `./src/data/`,
            },
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                policy: [{ userAgent: "*", disallow: "/" }],
            },
        },
    ],
};
