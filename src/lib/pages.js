import { getApolloClient } from "lib/apollo-client";

import { QUERY_ALL_PAGES, QUERY_PAGE_BY_URI } from "queries/pages";
import { mapPageData } from "./map-single";

/**
 * pagePathBySlug
 */

export function pagePathBySlug(slug) {
    return `/${slug}`;
}

/**
 * getPageByUri
 */

export async function getPageByUri(uri) {
    const apolloClient = getApolloClient();

    let pageData;

    try {
        pageData = await apolloClient.query({
            query: QUERY_PAGE_BY_URI,
            variables: {
                uri,
            },
        });
    } catch (e) {
        console.error(
            `[pages][getPageByUri] Failed to query page data: ${e.message}`
        );
        throw e;
    }

    const page = [pageData?.data.page].map(mapPageData)[0];

    return page;
}

/**
 * getAllPages
 */

export async function getAllPages() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: QUERY_ALL_PAGES,
    });

    const pages = data?.data.pages.edges
        .map(({ node = {} }) => node)
        .map(mapPageData);

    return {
        pages,
    };
}
