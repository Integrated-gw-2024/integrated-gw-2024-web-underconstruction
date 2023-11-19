/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    pathPrefix: `/gw24`,
    siteMetadata: {
        title: `多摩美術大学統合デザイン学科卒業・修了制作展2024`,
        siteUrl: `https://integrated.jp/gw24`,
        description: `coming soon... | 2024.1.18(木) - 1.21 (日) 9:00-17:00 | 多摩美術大学 上野毛キャンパス ｜入場無料・予約不要`,
    },
    plugins: [
        "gatsby-plugin-offline",
        "gatsby-plugin-sass",
        "gatsby-plugin-emotion",
        "gatsby-plugin-image",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: `多摩美術大学統合デザイン学科卒業・修了制作展2024`,
                short_name: `統合卒展2024`,
                start_url: `/`,
                background_color: "#ccd5e2",
                display: `standalone`,
                icon: "src/images/icon.png",
                icons: [
                    {
                        src: `/favicon/android-chrome/android-chrome-36px.png`,
                        sizes: `36x36`,
                        type: `image/png`,
                        purpose: "maskable",
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-48px.png`,
                        sizes: `48x48`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-72px.png`,
                        sizes: `72x72`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-96px.png`,
                        sizes: `96x96`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-128px.png`,
                        sizes: `128x128`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-144px.png`,
                        sizes: `144x144`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-152px.png`,
                        sizes: `152x152`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-192px.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-256px.png`,
                        sizes: `256x256`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-384px.png`,
                        sizes: `384x384`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/android-chrome/android-chrome-512px.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                        purpose: "maskable"
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-57px.png`,
                        sizes: `57x57`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-60px.png`,
                        sizes: `60x60`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-72px.png`,
                        sizes: `72x72`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-76px.png`,
                        sizes: `76x76`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-114px.png`,
                        sizes: `114x114`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-120px.png`,
                        sizes: `120x120`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-144px.png`,
                        sizes: `144x144`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-152px.png`,
                        sizes: `152x152`,
                        type: `image/png`,
                    },
                    {
                        src: `/favicon/apple-touch-icon/apple-touch-icon-180px.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
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
                host: "https://integrated.jp/gw24/",
                sitemap: "https://integrated.jp/gw24/sitemap-index.xml",
                resolveEnv: () => process.env.GATSBY_ENV,
                env: {
                    development: {
                        policy: [
                            {
                                userAgent: "*",
                                allow: ["/"],
                            },
                            {
                                userAgent: "Twitterbot",
                                disallow: [""],
                            },
                        ],
                    },
                    production: {
                        policy: [
                            {
                                userAgent: "*",
                                allow: ["/"],
                            },
                            {
                                userAgent: "Twitterbot",
                                disallow: [""],
                            },
                        ],
                    },
                },
            },
        },
    ],
};
