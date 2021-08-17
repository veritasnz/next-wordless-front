import PostGridItem from "./PostGridItem";

export default function PostGrid({ posts }) {
    return (
        <ul className="c-post-grid">
            {posts &&
                posts.length > 0 &&
                posts.map((post) => {
                    return <PostGridItem key={post.id} post={post} />;
                })}

            {!posts ||
                (posts.length === 0 && (
                    <li>
                        <p>Oops, no posts found!</p>
                    </li>
                ))}
        </ul>
    );
}
