import Head from "next/head";
import React from "react";

function CustomHead({ seo }: any) {
  // console.log("seo.pageTitle", seo.pageTitle);
  // console.log("seo.metaDescription", seo.metaDescription);
  return (
    <Head>
      <title>{seo.pageTitle}</title>
      <meta name="description" content={seo.metaDescription} />
    </Head>
  );
}

export default CustomHead;
