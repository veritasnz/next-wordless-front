import NavLinks from "../UI/NavLinks";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="c-footer o-wrapper">
            <div className="c-footer__wrap">
                <nav className="c-footer__nav">
                    <NavLinks />
                </nav>
                <p className="c-footer__copy">
                    ©︎ {currentYear}{" "}
                    <a
                        href="https://seanv.dev"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                    >
                        Sean Veritas
                    </a>{" "}
                    | Built with NextJS + WP
                </p>
            </div>
        </footer>
    );
}
