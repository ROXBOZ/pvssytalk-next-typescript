import "../styles/globals.css";

import { AnimatePresence } from "framer-motion";
import Head from "next/head";

export default function App({ Component, pageProps, router }: any) {
  return (
    <>
      <Head>
        <script>
          {`
                    window.biskouiSettings = {
          clientId: "1137520",
        };

        (function (d, s) {
          var t = d.getElementsByTagName(s)[0],
            e = d.createElement(s);
          e.async = true;
          e.src = "https://static.biskoui.ch/sdk.js";
          t.parentNode.insertBefore(e, t);
        })(document, "script")
          `}
        </script>
      </Head>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </>
  );
}
