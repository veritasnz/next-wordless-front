import NextApp from "next/app";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import { AnimatePresence } from "framer-motion";

import { getSiteSettings, mapSiteSeoProps } from "lib/site";

import { SiteContext } from "store/site-context";

import "styles/style.global.scss";

import Header from "components/Layout/Header";
import Main from "components/Layout/Main";

function App({ Component, pageProps = {}, router, siteSettings }) {
    const [defaultSeo, socialProfile] = mapSiteSeoProps(siteSettings);

    return (
        <SiteContext.Provider value={{ siteSettings }}>
            <DefaultSeo {...defaultSeo} />
            <SocialProfileJsonLd {...socialProfile} />

            <Header />
            <Main>
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.asPath} />
                </AnimatePresence>
            </Main>
        </SiteContext.Provider>
    );
}

App.getInitialProps = async function (appContext) {
    const appProps = await NextApp.getInitialProps(appContext);

    const siteSettings = await getSiteSettings();

    return {
        ...appProps,
        siteSettings,
    };
};

export default App;
