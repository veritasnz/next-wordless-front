import { getPlaiceholder } from "plaiceholder";

export async function createPlaceholderFromURL(url) {
    const { css } = await getPlaiceholder(url);
    return css;
}

export async function assignPlaceholderToSingle(single) {
    if (single.featuredImage) {
        const css = await createPlaceholderFromURL(
            single.featuredImage.sourceUrl
        );

        single.featuredImage = Object.assign(
            { placeholder: css },
            single.featuredImage
        );
    }
}

export async function assignPlaceholderToSingles(singles) {
    await Promise.all(
        singles.map(async (single) => {
            await assignPlaceholderToSingle(single);
            return single;
        })
    );
}
