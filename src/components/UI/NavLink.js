import React, { Children } from "react";
import { withRouter } from "next/router";
import Link from "next/link";

const NavLink = ({ router, children, ...props }) => {
    const child = Children.only(children);

    let className = child.props.className || "";

    if (router.pathname === props.href) {
        className = `${className} link-active`.trim();
    }

    delete props.activeClassName;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default withRouter(NavLink);
