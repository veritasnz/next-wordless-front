import { NextSeo } from "next-seo";

import { getAllPostSlugs, getPostBySlug, getRecentPosts } from "lib/posts";
import { mapSingleSeoProps } from "lib/map-single";

import PageTransitionWrapper from "components/Layout/PageTransitionWrapper";
import PageTitle from "components/Layout/PageTitle";
import SingleContent from "components/Single/SingleContent";
import MorePosts from "../../components/Single/MorePosts";

export default function Post({ post, seo, recentPosts }) {
    return (
        <PageTransitionWrapper>
            <NextSeo {...seo} />

            <PageTitle title={post.title} />
            <SingleContent content={post.content} />

            {recentPosts.length > 0 && <MorePosts posts={recentPosts} />}
        </PageTransitionWrapper>
    );
}

export async function getStaticProps({ params = {} } = {}) {
    const { post } = await getPostBySlug(params?.slug);
    const seo = mapSingleSeoProps(post, "post");

    const { posts: recentPosts } = await getRecentPosts({
        count: 3,
        slugToExclude: params?.slug,
    });

    return {
        props: {
            post,
            recentPosts,
            seo,
        },
    };
}

export async function getStaticPaths() {
    const { slugs } = await getAllPostSlugs();

    const paths = slugs.map((slug) => {
        return {
            params: {
                slug,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
}
