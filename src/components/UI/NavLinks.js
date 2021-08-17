import NavLink from "components/UI/NavLink";

export default function NavLinks() {
    return (
        <>
            <NavLink href="/">
                <a>Home</a>
            </NavLink>
            <NavLink href="/about">
                <a>About</a>
            </NavLink>
            <NavLink href="/posts">
                <a>Posts</a>
            </NavLink>
            <NavLink href="/contact">
                <a>Contact</a>
            </NavLink>
        </>
    );
}
