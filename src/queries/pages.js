import { gql } from "@apollo/client";

export const QUERY_ALL_PAGES = gql`
    {
        pages(first: 10000) {
            edges {
                node {
                    children {
                        edges {
                            node {
                                id
                                slug
                                uri
                                ... on Page {
                                    id
                                    title
                                }
                            }
                        }
                    }
                    content
                    excerpt
                    featuredImage {
                        node {
                            altText
                            caption
                            id
                            sizes
                            sourceUrl
                            srcSet
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                    id
                    parent {
                        node {
                            id
                            slug
                            uri
                            ... on Page {
                                title
                            }
                        }
                    }
                    slug
                    title
                    uri
                }
            }
        }
    }
`;

export const QUERY_PAGE_BY_URI = gql`
    query PageByUri($uri: ID!) {
        page(id: $uri, idType: URI) {
            children {
                edges {
                    node {
                        id
                        slug
                        uri
                        ... on Page {
                            id
                            title
                        }
                    }
                }
            }
            content
            excerpt
            featuredImage {
                node {
                    id
                    altText
                    caption
                    sizes
                    sourceUrl
                    srcSet
                    mediaDetails {
                        height
                        width
                    }
                }
            }
            id
            parent {
                node {
                    id
                    slug
                    uri
                    ... on Page {
                        title
                    }
                }
            }
            slug
            title
            uri
        }
    }
`;
