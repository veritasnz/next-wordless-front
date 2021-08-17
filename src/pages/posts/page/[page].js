import { NextSeo } from "next-seo";

import { getAllPosts, getPagesCount, getPaginatedPosts } from "lib/posts";

import PageTransitionWrapper from "components/Layout/PageTransitionWrapper";
import PostGrid from "components/Single/PostGrid";
import Pagination from "components/Single/Pagination";
import PageTitle from "../../../components/Layout/PageTitle";

export default function Posts({ posts, pagination }) {
    const { currentPage } = pagination;

    let title = `Post Archive`;
    if (currentPage) title = title + ` – Page ${currentPage}`;

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

export async function getStaticProps({ params = {} } = {}) {
    const { posts, pagination } = await getPaginatedPosts(params?.page);

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

export async function getStaticPaths() {
    const { posts } = await getAllPosts();
    const pagesCount = await getPagesCount(posts);
    const paths = [...new Array(pagesCount)].map((_, i) => {
        return { params: { page: String(i + 1) } };
    });
    return {
        paths,
        fallback: false,
    };
}
