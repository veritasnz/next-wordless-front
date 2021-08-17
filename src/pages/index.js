import { getRecentPosts } from "lib/posts";
import { assignPlaceholderToSingles } from "lib/plaiceholder";

import PageTransitionWrapper from "components/Layout/PageTransitionWrapper";
import PostGrid from "components/Single/PostGrid";
import PageTitle from "../components/Layout/PageTitle";

export default function Home({ recentPosts }) {
    return (
        <PageTransitionWrapper>
            <PageTitle title="Welcome!" />
            <PostGrid posts={recentPosts} />
        </PageTransitionWrapper>
    );
}

export const getStaticProps = async () => {
    const { posts: recentPosts } = await getRecentPosts({ count: 3 });
    await assignPlaceholderToSingles(recentPosts);

    return {
        props: {
            recentPosts,
        },
    };
};
