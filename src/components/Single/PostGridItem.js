import { useContext } from "react";
import Link from "next/link";

import { SiteContext } from "store/site-context";

import { PlaceheldImage } from "components/UI/PlaceheldImage";

export default function PostGridItem({ post }) {
    const { siteSettings } = useContext(SiteContext);
    const { featuredImage, isSticky } = post;

    const alt = featuredImage?.altText || featuredImage?.caption || post.title;
    const imageProps = { layout: "fill", alt };

    let placeholder;

    if (featuredImage) {
        imageProps.src = featuredImage.sourceUrl;
        placeholder = featuredImage.placeholder;
    } else {
        imageProps.src = siteSettings.sitePlaceholderImage.mediaItemUrl;
        placeholder = {
            background: siteSettings.sitePlaceholderBackground,
        };
    }

    return (
        <li
            key={post.slug}
            className={`c-post-item ${isSticky && "c-post-item--sticky"}`}
        >
            <Link href={post.path}>
                <a>
                    <div className="c-post-item__image">
                        <PlaceheldImage
                            imageProps={imageProps}
                            placeholder={placeholder}
                        />
                    </div>
                    <h3
                        className="c-post-item__title"
                        dangerouslySetInnerHTML={{
                            __html: post.title,
                        }}
                    />
                    <p className="c-post-item__excerpt">{post.excerpt}</p>
                </a>
            </Link>
        </li>
    );
}
