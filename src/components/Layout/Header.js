import { useContext } from "react";
import { useRouter } from "next/dist/client/router";

import { SiteContext } from "store/site-context";

import NavLinks from "../UI/NavLinks";

export default function Header() {
    const router = useRouter();
    const { siteSettings } = useContext(SiteContext);

    // Determine tag-type for title
    const isHome = router.asPath === "/";
    const TitleTag = isHome ? "h1" : "p";

    return (
        <header className="c-header">
            <div className="c-header__flag">
                <TitleTag className="c-header__title">
                    {siteSettings.siteTitle}
                </TitleTag>
                <p className="c-header__text">{siteSettings.seoDescription}</p>
            </div>
            <div className="c-header__navbar">
                <NavLinks />
            </div>
        </header>
    );
}
