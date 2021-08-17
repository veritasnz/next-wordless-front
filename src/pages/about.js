import { NextSeo } from "next-seo";

import { getPageByUri } from "lib/pages";
import { mapSingleSeoProps } from "lib/map-single";
import { assignPlaceholderToSingle } from "lib/plaiceholder";

import PageTransitionWrapper from "components/Layout/PageTransitionWrapper";
import FeaturedImage from "components/Single/FeaturedImage";
import SingleContent from "components/Single/SingleContent";
import PageTitle from "components/Layout/PageTitle";

export default function Page({ page, seo }) {
    const { title, content, featuredImage } = page;

    return (
        <>
            <NextSeo {...seo} />

            <PageTransitionWrapper>
                <PageTitle title={title} />
                {featuredImage && (
                    <FeaturedImage
                        featuredImage={featuredImage}
                        placeholder={featuredImage.placeholder}
                    />
                )}
                <SingleContent content={content} />
            </PageTransitionWrapper>
        </>
    );
}

export async function getStaticProps() {
    const page = await getPageByUri("/about");
    const seo = mapSingleSeoProps(page, "page");

    await assignPlaceholderToSingle(page);

    return {
        props: {
            page,
            seo,
        },
    };
}
