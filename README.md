_**DISCLAIMER:** This is primarily a portfolio project and boilerplate made for my own personal use. This project has not been tested thoroughly in production_

# Next.js /w Headless WordPress Template (WIP)

My extendable template for quick starting the development of headless Wordpress sites, utilizing the power of React, Next.js and server-side rendering.

Store your posts and editable site data with Wordpress, and use Next.js with GraphQL to pull it off the server and display it.

[🔗&nbsp;&nbsp;Sample site](https://wordless.seanv.dev/)

**⚠️&nbsp;&nbsp;NOTE:** This repo contains the 'front' side of the project. The code to run the backend side can be found at [here](https://github.com/veritasnz/next-wordless-back), and is in the form of a Wordpress theme.

## Features

-   Server-side rendering for all pages (including SEO)
-   WP Post & Page support
-   Page transition animations
-   Image placeholders
-   Basic SEO support (no WP plugins required)
-   A simple contact form:
    -   On submit, receipt emails sent to both user & admin on form submission
    -   Optional system to back up emails using a Parse server (e.g. with [Back4App](https://www.back4app.com/))
    -   Spam protection
        -   Rate limiting (server-side)
        -   Custom honeypot (client-side)
-   Site-wide Context to store recent posts and general site settings

### Missing Features (To Do)

This template does not (out of the box) support a few features typical of a standard Wordpress site/theme:

-   Advanced SEO, e.g. RSS/Sitemap implementation
-   Search feature implementation
-   Support for Post categories and archives
-   Gutenburg-specific default block styles

## Requirements

-   [WordPress](https://wordpress.org/)
-   [ACF Pro Wordpress Plugin](https://www.advancedcustomfields.com/pro/) (necessary for 'Site Options' option page)
-   [WPGraphQL Wordpress Plugin](https://www.wpgraphql.com/)
-   [WPGraphQL for Advanced Custom Fields](https://github.com/wp-graphql/wp-graphql-acf)
-   Environment variables (see below)

### Environment Variables

A few environment variables are needed to get this project working.
Create a new file locally called `.env.local` and add the following:

| Name                       | Required | Description                                                              |
| -------------------------- | -------- | ------------------------------------------------------------------------ |
| NEXT_PUBLIC_URL            | Yes      | The URL for your frontend (e.g. mysite.com)                              |
| WORDPRESS_DOMAIN           | Yes      | Domain name used by Wordpress (e.g. wordpress.mysite.com)                |
| WORDPRESS_GRAPHQL_ENDPOINT | Yes      | WordPress WPGraphQL endpoint (e.g.: https://wordpress.mysite.com/graphl) |
| SMTP_HOST                  | Yes      | Host address by your SMTP server                                         |
| SMTP_PORT                  | Yes      | Port used by your SMTP server (e.g. 587)                                 |
| SMTP_USER                  | Yes      | Username for your SMTP server (e.g. bob@mysite.com)                      |
| SMTP_PASS                  | Yes      | Password for your SMTP server                                            |
| MAIL_NOREPLY               | Yes      | Used for site admin receipt emails (e.g. noreply@mysite.com)             |
| PARSE_SERVER_URL           | No       | (Optional) Your Parse server URL (e.g. https://parseapi.back4app.com/)   |
| PARSE_APP_ID               | No       | (Optional) App ID for your Parse server                                  |
| PARSE_JS_KEY               | No       | (Optional) JS Key for your Parse server                                  |

### Installation

To install:

```bash
yarn create next-app -e https://github.com/veritasnz/next-wordless-front
# or
npx create-next-app -e https://github.com/veritasnz/next-wordless-front
```

To run the project locally:

```bash
yarn dev
# or
npm run dev
```

The project should now be available at [http://localhost:3000](http://localhost:3000)!

### Setting up WP Webhooks

You can set up webhooks with your Next.js provider (e.g. Vercel/Netlify) to execute a rebuild whenever a post, page or ACF option page is edited.

This is highly recommended, and can be done by installing the Wordpress plugin [WP Webhooks](https://wordpress.org/plugins/wp-webhooks/). Enter your Webhook URL for the "Post updated", "Post created", "Post trashed" and "Custom Action" triggers.

_Entering your details for the "Custom Action" trigger is required, as the [theme for the backend](https://github.com/veritasnz/next-wordless-back) has a filter to pick up on ACF options page change._

## 📢 Shoutouts

-   Big shoutout to [Colby Fayock](https://twitter.com/colbyfayock) and his excellent [headless WP Next.js template](https://github.com/colbyfayock/next-wordpress-starter), which I drew heavy inspiration from.
-   Also thanks to [Kurage Digital](https://kuragedigital.com/) for hosting the Wordpress instance for the sample site
