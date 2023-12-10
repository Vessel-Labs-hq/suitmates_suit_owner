import Head from "next/head";

import React from "react";

const SEO = ({ description, image, title, twitterCard, noindex }: Partial<SEOobject>) => (
  <Head>
    <title key="title">{title || "Suitemates"}</title>
    <meta name="title" content={title || "Suitemates"} key="metatitle" />
    <meta
      name="description"
      content={
        description ||
        "Suitemates: Track, maintain and organize your suites and space in one location"
      }
      key="description"
    />

    <meta property="og:title" content={title || "Suitemates"} key="og:title" />
    <meta
      property="og:description"
      content={
        description ||
        "Suitemates: Track, maintain and organize your suites and space in one location"
      }
      key="og:description"
    />
    {image && <meta property="og:image" content={image} key="og:image" />}
    <meta property="og:site_name" content="Suitemates" key="og:site_name" />
    <meta property="og:type" content="website" key="og:type" />

    <meta name="twitter:title" content={title || "Suitemates"} key="twitter:title" />
    <meta
      name="twitter:description"
      content={
        description ||
        "Suitemates: Track, maintain and organize your suites and space in one location"
      }
      key="twitter:description"
    />
    {image && <meta name="twitter:image" content={image} key="twitter:image" />}
    <meta name="twitter:card" content={twitterCard || "summary"} key="twitter:card" />
    <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" />
    <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
    {/* <meta httpEquiv="Cross-Origin-Resource-Policy" content="cross-origin" /> */}

    {noindex && <meta name="robots" content="noindex" key="noindex" />}
  </Head>
);

export default SEO;
