import Head from "next/head";
import React from "react";

function CustomHead({ seo }: any) {
  return (
    <Head>
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.biskouiSettings = {
                clientId: "4568013",
              };

              (function (d, s) {
                var t = d.getElementsByTagName(s)[0],
                e = d.createElement(s);
                e.async = true;
                e.src = "https://static.biskoui.ch/sdk.js";
                t.parentNode.insertBefore(e, t);
              })(document, "script");
            `,
          }}
        />
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
