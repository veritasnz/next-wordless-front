import { gql } from "@apollo/client";

export const QUERY_SITE_DATA = gql`
    {
        generalSettings {
            language
            timeFormat
        }
        siteOptions {
            base {
                siteTitle
                siteFaviconSmall {
                    sourceUrl
                }
                siteFaviconLarge {
                    sourceUrl
                }
                sitePlaceholderImage {
                    mediaItemUrl
                    mediaDetails {
                        height
                        width
                    }
                }
                sitePlaceholderBackground
                seoDescription
                seoLinkedin
                seoInstagram
                seoFacebook
                seoTwitter
                seoType
                seoImage {
                    mediaItemUrl
                    mediaDetails {
                        height
                        width
                    }
                }
            }
        }
    }
`;
