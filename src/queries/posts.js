import { gql } from "@apollo/client";

export const QUERY_ALL_POSTS = gql`
    query AllPosts {
        posts(first: 10000) {
            edges {
                node {
                    id
                    categories {
                        edges {
                            node {
                                categoryId
                                id
                                name
                                slug
                            }
                        }
                    }
                    date
                    excerpt
                    featuredImage {
                        node {
                            altText
                            caption
                            sourceUrl(size: MEDIUM)
                            srcSet
                            sizes
                            id
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                    modified
                    postId
                    title
                    slug
                    isSticky
                }
            }
        }
    }
`;

export const QUERY_ALL_POST_SLUGS = gql`
    query AllPosts {
        posts(first: 10000) {
            edges {
                node {
                    id
                    postId
                    slug
                }
            }
        }
    }
`;

export const QUERY_POST_BY_SLUG = gql`
    query PostBySlug($slug: ID!) {
        post(id: $slug, idType: SLUG) {
            id
            categories {
                edges {
                    node {
                        categoryId
                        id
                        name
                        slug
                    }
                }
            }
            content
            date
            excerpt(format: RENDERED)
            featuredImage {
                node {
                    id
                    altText
                    caption
                    sizes
                    sourceUrl(size: LARGE)
                    srcSet
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            modified
            databaseId
            title
            slug
            isSticky
        }
    }
`;

export const QUERY_POSTS_BY_CATEGORY_ID = gql`
    query PostsByCategoryId($categoryId: Int!) {
        posts(where: { categoryId: $categoryId }) {
            edges {
                node {
                    id
                    categories {
                        edges {
                            node {
                                categoryId
                                id
                                name
                                slug
                            }
                        }
                    }
                    content
                    date
                    excerpt
                    featuredImage {
                        node {
                            id
                            altText
                            caption
                            sizes
                            sourceUrl(size: MEDIUM)
                            srcSet
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                    modified
                    postId
                    title
                    slug
                    isSticky
                }
            }
        }
    }
`;

export const QUERY_POST_PER_PAGE = gql`
    query PostPerPage {
        allSettings {
            readingSettingsPostsPerPage
        }
    }
`;
