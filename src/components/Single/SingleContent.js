export default function SingleContent({ content }) {
    let innerContent = (
        <p className="c-single-content__empty">No post content found...</p>
    );

    if (typeof content === "string" && content.trim()) {
        innerContent = (
            <div
                className="o-prose"
                dangerouslySetInnerHTML={{ __html: content }}
            ></div>
        );
    }

    return <div className="c-single-content">{innerContent}</div>;
}
