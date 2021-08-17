/**
 * The below code is a customised version of
 * https://github.com/colbyfayock/next-wordpress-starter/blob/main/src/components/Pagination/Pagination.js
 */

import Link from "next/link";

const MAX_NUM_PAGES = 9; // Up to 100 posts – the default WP GraphQL post query limit

const Pagination = ({ pagesCount, currentPage, basePath }) => {
    const path = `${basePath}/page/`;

    const hasPreviousPage = pagesCount > 1 && currentPage > 1;
    const hasNextPage = pagesCount > 1 && currentPage < pagesCount;

    let hasPrevDots = false;
    let hasNextDots = false;

    function getPages() {
        let pages = pagesCount;
        let start = 0;
        // If the number of pages exceeds the max
        if (pagesCount > MAX_NUM_PAGES) {
            // Set number of pages to the max
            pages = MAX_NUM_PAGES;
            const half = Math.ceil(MAX_NUM_PAGES / 2);
            const isHead = currentPage <= half;
            const isTail = currentPage > pagesCount - half;
            hasNextDots = !isTail;
            // If the current page is at the head, the start variable remains 0
            if (!isHead) {
                hasPrevDots = true;
                // If the current page is at the tail, the start variable is set to
                // the last chunk. Otherwise the start variable will place the current
                // page at the middle
                start = isTail
                    ? pagesCount - MAX_NUM_PAGES
                    : currentPage - half;
            }
        }
        return [...new Array(pages)].map((_, i) => i + 1 + start);
    }

    const pages = getPages();

    return (
        <nav
            className="c-pagination"
            role="navigation"
            aria-label="Pagination Navigation"
        >
            {hasPreviousPage && (
                <Link href={`${path}${currentPage - 1}`}>
                    <a className="c-pagination__arrow" aria-label="Goto Previous Page">Previous</a>
                </Link>
            )}

            <ul className="c-pagination__wrap">
                {hasPrevDots && (
                    <li>
                        <span
                            aria-label={`Navigation to pages 1-${
                                pages[0] - 1
                            } hidden`}
                        >
                            ...
                        </span>
                    </li>
                )}
                {pages.map((page) => {
                    const active = page === currentPage;
                    return active ? (
                        <li className="active" key={page}>
                            <span
                                aria-label={`Current Page, Page ${page}`}
                                aria-current="true"
                            >
                                {page}
                            </span>
                        </li>
                    ) : (
                        <li key={page}>
                            <Link href={`${path}${page}`}>
                                <a aria-label={`Goto Page ${page}`}>
                                    <span>{page}</span>
                                </a>
                            </Link>
                        </li>
                    );
                })}
                {hasNextDots && (
                    <li>
                        <span
                            aria-label={`Navigation to pages ${
                                pages[pages.length - 1] + 1
                            }-${pagesCount} hidden`}
                        >
                            ...
                        </span>
                    </li>
                )}
            </ul>

            {hasNextPage && (
                <Link href={`${path}${currentPage + 1}`}>
                    <a className="c-pagination__arrow" aria-label="Goto Next Page">Next</a>
                </Link>
            )}
        </nav>
    );
};

export default Pagination;
