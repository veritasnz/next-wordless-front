import { PlaceheldImage } from "../UI/PlaceheldImage";

export default function FeaturedImage ({ placeholder, featuredImage }) {
    const imageProps = {
        src: featuredImage.sourceUrl,
        width: featuredImage.width,
        height: featuredImage.height,
    };

    return (
        <div className="c-featured-image">
            <PlaceheldImage placeholder={placeholder} imageProps={imageProps} />
        </div>
    );
}
