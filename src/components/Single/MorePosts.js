import PostGrid from "components/Single/PostGrid";

export default function MorePosts(props) {
    const { posts } = props;

    return (
        <div className="c-more-posts">
            <h3 className="c-section-title">More Posts</h3>
            <PostGrid posts={posts} />
        </div>
    );
}
