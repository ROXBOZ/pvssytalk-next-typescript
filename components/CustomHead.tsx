import Head from "next/head";
import React from "react";

function CustomHead({ seo }: any) {
  return (
    <Head>
      {seo && seo.pageTitle && <title>{seo.pageTitle}</title>}
      {seo && seo.metaDescription && (
        <meta name="description" content={seo.metaDescription} />
      )}
    </Head>
  );
}

export default CustomHead;
