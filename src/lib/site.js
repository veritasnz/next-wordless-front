import { getApolloClient } from "lib/apollo-client";

import { decodeHtmlEntities } from "lib/util";

import { QUERY_SITE_DATA } from "queries/site";

/**
 * getSiteSettings
 */

export async function getSiteSettings() {
    const apolloClient = getApolloClient();

    let siteData;

    // Get data
    try {
        siteData = await apolloClient.query({
            query: QUERY_SITE_DATA,
        });
    } catch (e) {
        console.error(
            `[site][getSiteSettings] Failed to query site data: ${e.message}`
        );
        throw e;
    }

    // Deconstruct
    const { generalSettings, siteOptions } = siteData?.data;

    // Set return object
    const settings = {
        timeFormat: generalSettings.timeFormat,
        ...siteOptions.base,
    };

    // Set title
    settings.siteTitle = siteOptions.base.siteTitle
        ? decodeHtmlEntities(siteOptions.base.siteTitle)
        : "";

    // Set language (English is returned as empty by WP)
    if (!generalSettings.language || generalSettings.language === "") {
        settings.language = "en";
    } else {
        settings.language = generalSettings.language.split("_")[0];
    }

    return settings;
}

/**
 * mapSiteSeoProps
 */
export const mapSiteSeoProps = (settings) => {
    const defaultSeo = {
        defaultTitle: settings.siteTitle,
        titleTemplate: `%s | ${settings.siteTitle}`,
        description: settings.seoDescription,
        openGraph: {
            title: settings.siteTitle,
            description: settings.seoDescription,
            type: "website",
            locale: settings.language,
            url: process.env.NEXT_PUBLIC_URL,
            site_name: settings.siteTitle,
            images: [
                {
                    url: settings.seoImage?.mediaItemUrl,
                    width: settings.seoImage?.mediaDetails?.width,
                    height: settings.seoImage?.mediaDetails?.height,
                    alt: settings.siteTitle,
                },
            ],
            twitter: {
                handle: `@${settings.seoTwitter}`,
                site: `@${settings.seoTwitter}`,
                cardType: "summary_large_image",
            },
        },
    };

    defaultSeo.additionalLinkTags = [];

    if (settings.siteFaviconSmall) {
        defaultSeo.additionalLinkTags.push({
            rel: "icon",
            href: settings.siteFaviconSmall.sourceUrl,
            sizes: "32x32",
        });
    }

    if (settings.siteFaviconLarge) {
        defaultSeo.additionalLinkTags.push({
            rel: "apple-touch-icon",
            href: settings.siteFaviconLarge.sourceUrl,
            sizes: "180x180",
        });
    }

    const socialProfile = {
        type: settings.seoType,
        name: settings.siteTitle,
        url: process.env.NEXT_PUBLIC_URL,
        sameAs: [
            settings.seoLinkedin,
            settings.seoInstagram,
            settings.seoFacebook,
            `https://twitter.com/${settings.seoTwitter}`,
        ],
    };

    return [defaultSeo, socialProfile];
};
