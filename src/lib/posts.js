/**
 * The below is a customised version of the below JS file
 * https://github.com/colbyfayock/next-wordpress-starter/blob/main/src/lib/posts.js
 */

import { getApolloClient } from "lib/apollo-client";
import { sortObjectsByDate } from "lib/datetime";

import {
    QUERY_ALL_POSTS,
    QUERY_POST_BY_SLUG,
    QUERY_POSTS_BY_CATEGORY_ID,
    QUERY_POST_PER_PAGE,
    QUERY_ALL_POST_SLUGS,
} from "queries/posts";

import { mapPostData } from "./map-single";

/**
 * postPathBySlug
 */
export function postPathBySlug(slug) {
    return `/posts/${slug}`;
}

/**
 * getPostBySlug
 */
export async function getPostBySlug(slug) {
    const apolloClient = getApolloClient();

    let postData;

    try {
        postData = await apolloClient.query({
            query: QUERY_POST_BY_SLUG,
            variables: {
                slug,
            },
        });
    } catch (e) {
        console.error(
            `[posts][getPostBySlug] Failed to query post data: ${e.message}`
        );
        throw e;
    }

    const post = [postData?.data.post].map(mapPostData)[0];

    return { post };
}

/**
 * getAllPosts
 */
export async function getAllPosts() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: QUERY_ALL_POSTS,
    });

    const posts = data?.data.posts.edges.map(({ node = {} }) => node);

    return {
        posts: Array.isArray(posts) && posts.map(mapPostData),
    };
}

/**
 * getAllPostSlugs
 */
export async function getAllPostSlugs() {
    const apolloClient = getApolloClient();

    const data = await apolloClient.query({
        query: QUERY_ALL_POST_SLUGS,
    });

    const posts = data?.data.posts.edges.map(({ node = {} }) => node);

    return {
        slugs: Array.isArray(posts) && posts.map((post) => post.slug),
    };
}

/**
 * getPostsByCategoryId
 */
export async function getPostsByCategoryId(categoryId) {
    const apolloClient = getApolloClient();

    let postData;

    try {
        postData = await apolloClient.query({
            query: QUERY_POSTS_BY_CATEGORY_ID,
            variables: {
                categoryId,
            },
        });
    } catch (e) {
        console.error(`Failed to query post data: ${e.message}`);
        throw e;
    }

    const posts = postData?.data.posts.edges.map(({ node = {} }) => node);

    return {
        posts: Array.isArray(posts) && posts.map(mapPostData),
    };
}

/**
 * getRecentPosts
 */

export async function getRecentPosts({ count, slugToExclude }) {
    const { posts } = await getAllPosts();

    let filtered = posts;

    if (slugToExclude) {
        filtered = filtered.filter((post) => post.slug !== slugToExclude);
    }

    filtered = sortObjectsByDate(filtered);
    filtered = sortStickyPosts(filtered);

    return {
        posts: filtered.slice(0, count),
    };
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt) {
    if (typeof excerpt !== "string") {
        throw new Error(
            `Failed to sanitize excerpt: invalid type ${typeof excerpt}`
        );
    }

    let sanitized = excerpt;

    // Remove <p> tag if there is one
    sanitized = sanitized.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, "");
    // If the theme includes [...] as the more indication, clean it up to just ...
    sanitized = sanitized.replace(/\s?\[&hellip;\]/, "...");
    // After above replacement, the ellipsis may still have 4 dots
    sanitized = sanitized.replace("....", "...");
    // Remove <br> tags
    sanitized = sanitized.replace("<br />", "");

    return sanitized;
}

/**
 * getRelatedPosts
 */

export async function getRelatedPosts(category, postId, count = 5) {
    let relatedPosts = [];

    if (category) {
        const { posts } = await getPostsByCategoryId(category.categoryId);
        const filtered = posts.filter(({ postId: id }) => id !== postId);
        const sorted = sortObjectsByDate(filtered);
        relatedPosts = sorted.map((post) => ({
            title: post.title,
            slug: post.slug,
        }));
    }

    if (relatedPosts.length > count) {
        return relatedPosts.slice(0, count);
    }
    return relatedPosts;
}

/**
 * sortStickyPosts
 */

export function sortStickyPosts(posts) {
    return [...posts].sort((post) => (post.isSticky ? -1 : 1));
}

/**
 * getPostsPerPage
 */

export async function getPostsPerPage() {
    try {
        const apolloClient = getApolloClient();

        const { data } = await apolloClient.query({
            query: QUERY_POST_PER_PAGE,
        });

        return Number(data.allSettings.readingSettingsPostsPerPage);
    } catch (e) {
        console.error(`Failed to query post per page data: ${e.message}`);
        throw e;
    }
}

/**
 * getPageCount
 */

export async function getPagesCount(posts, postsPerPage) {
    const _postsPerPage = postsPerPage ?? (await getPostsPerPage());
    return Math.ceil(posts.length / _postsPerPage);
}

/**
 * getPaginatedPosts
 */

export async function getPaginatedPosts(currentPage = 1) {
    const { posts } = await getAllPosts();
    const postsPerPage = await getPostsPerPage();
    const pagesCount = await getPagesCount(posts, postsPerPage);

    let page = Number(currentPage);

    if (typeof page === "undefined" || isNaN(page) || page > pagesCount) {
        page = 1;
    }

    const offset = postsPerPage * (page - 1);
    const sortedPosts = sortStickyPosts(posts);

    return {
        posts: sortedPosts.slice(offset, offset + postsPerPage),
        pagination: {
            currentPage: page,
            pagesCount,
        },
    };
}
