import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import { withPrefix } from "gatsby";

function SEO({ title, desc, lang, type, image, twID }) {
    const { site } = useStaticQuery(query);
    const { siteName, defaultDesc , siteURL } = site.siteMetadata;
    const defaultOGImage = withPrefix(`og.png`);
    const { pathname } = useLocation();
    const faviconSVG = withPrefix(`favicon.svg`);
    const faviconICO = withPrefix(`favicon.ico`);

    const seo = {
        title: siteName,
        ogTitle: siteName,
        siteName: siteName,
        desc: desc || defaultDesc,
        lang: lang || "ja",
        url: `${siteURL}${pathname}`,
        favicon: {
            svg: faviconSVG,
            ico: faviconICO,
        },
        og: {
            type: type || "website",
            image: image || defaultOGImage,
            twID: twID || "@integrated_gw",
        },
    };

    if (title != undefined) {
        seo.title = siteName;
        seo.ogTitle = title;
    }

    return (
        <>
            <title>{seo.title}</title>
            <link rel="icon" href={seo.favicon.svg} type="image/svg+xml"/>
            <link rel="icon" href={seo.favicon.ico} type="image/vnd.microsoft.icon"/>
            <meta http-equiv="Content-Language" content={seo.lang} />
            <meta name="description" content={seo.desc} />
            <meta property="og:title" content={seo.ogTitle} />
            <meta property="og:site_name" content={seo.siteName} />
            <meta property="og:description" content={seo.desc} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:type" content={seo.og.type} />
            <meta property="og:image" content={seo.og.image} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="note:card" content="summary_large_image" />
            <meta name="twitter:site" content="@integrated_gw" />
            <meta name="twitter:creator" content={seo.og.twID} />
        </>
    );
}

export default SEO;

const query = graphql`
    {
        site {
            siteMetadata {
                siteName: title
                defaultDesc: description
                siteURL: siteUrl
            }
        }
    }
`;
