import { NextSeo } from "next-seo";

import { getPaginatedPosts } from "lib/posts";
import { assignPlaceholderToSingles } from "lib/plaiceholder";

import PageTransitionWrapper from "components/Layout/PageTransitionWrapper";
import PageTitle from "../../components/Layout/PageTitle";
import PostGrid from "components/Single/PostGrid";
import Pagination from "components/Single/Pagination";

export default function Archive({ posts, pagination }) {
    const title = "Post Archive";

    return (
        <>
            <NextSeo title={title} />

            <PageTransitionWrapper>
                <PageTitle title={title} />
                <PostGrid posts={posts} />
                {pagination && (
                    <Pagination
                        currentPage={pagination?.currentPage}
                        pagesCount={pagination?.pagesCount}
                        basePath={pagination?.basePath}
                    />
                )}
            </PageTransitionWrapper>
        </>
    );
}

export async function getStaticProps() {
    const { posts, pagination } = await getPaginatedPosts();
    await assignPlaceholderToSingles(posts);

    return {
        props: {
            posts,
            pagination: {
                ...pagination,
                basePath: "/posts",
            },
        },
    };
}
