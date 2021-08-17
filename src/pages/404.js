import { NextSeo } from "next-seo";

import PageTransitionWrapper from "components/Layout/PageTransitionWrapper";
import PageTitle from "../components/Layout/PageTitle";
import Error404 from "components/Layout/Error404";

export default function Page404() {
    const title = "404 – Page Not Found";
    const description =
        "The page you were looking for doesn't exist. Please check the URL and try again";

    const seo = {
        title,
        description,
    };

    return (
        <>
            <NextSeo {...seo} />

            <PageTransitionWrapper>
                <PageTitle title={title} />
                <Error404 description={description} />
            </PageTransitionWrapper>
        </>
    );
}
