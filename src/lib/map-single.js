/**
 *
 * Map returned Single GraphQL data
 * Clean and make easier to access
 *
 */
import { sanitizeExcerpt } from "lib/posts";

/**
 * mapPostData
 */
export function mapPostData(post = {}) {
    const data = { ...post };

    // Clean up the categories to make them more easy to access
    if (data.categories) {
        data.categories = data.categories.edges.map(({ node }) => {
            return {
                ...node,
            };
        });
    }

    if (data.excerpt) {
        data.excerpt = sanitizeExcerpt(data.excerpt);
    }

    if (data.featuredImage) {
        data.featuredImage = mapFeaturedImage(data.featuredImage);
    }

    // Add path URL
    data.path = `/posts/${data.slug}`;

    return data;
}

/**
 * mapPageData
 */

export function mapPageData(page = {}) {
    const data = { ...page };

    if (data.featuredImage) {
        data.featuredImage = mapFeaturedImage(data.featuredImage);
    }

    if (data.parent) {
        data.parent = data.parent.node;
    }

    if (data.children) {
        data.children = data.children.edges.map(({ node }) => node);
    }

    return data;
}

/**
 * mapSingleSeoProps
 */
export const mapSingleSeoProps = (single, type = "post") => {
    const seoProps = {
        title: single.title,
        description: sanitizeExcerpt(single.excerpt),
    };

    seoProps.openGraph = {};

    if (type === "post") {
        seoProps.openGraph = {
            type: "article",
            article: {
                publishedTime: single.date,
                modifiedTime: single.modified,
                tags: single.categories?.map((cat) => {
                    return cat.name;
                }),
            },
        };
    }

    if (single.featuredImage) {
        seoProps.openGraph.images = [
            {
                url: single.featuredImage.sourceUrl,
                width: single.featuredImage.width,
                height: single.featuredImage.height,
                alt: single.title,
            },
        ];
    }

    return seoProps;
};

/**
 *
 * Helpers
 *
 */

// Clean up the featured image to make props more easy to access
function mapFeaturedImage(featuredImage) {
    featuredImage = featuredImage.node;

    const { width, height } = featuredImage.mediaDetails;
    featuredImage = Object.assign({ width, height }, featuredImage);

    return featuredImage;
}
