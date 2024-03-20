import Head from "next/head";
import React from "react";

function CustomHead({ seo }: any) {
  return (
    <Head>
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {seo && seo.pageTitle && <title>pvssy talk | {seo.pageTitle}</title>}
        {seo && seo.metaDescription && (
          <meta name="description" content={seo.metaDescription} />
        )}
      </>
    </Head>
  );
}

export default CustomHead;
