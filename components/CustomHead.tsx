import Head from "next/head";
import React from "react";

function CustomHead({ seo }: any) {
  return (
    <Head>
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="https://pvssytalk.matomo.cloud/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src='https://cdn.matomo.cloud/pvssytalk.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
          }}
        />

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
