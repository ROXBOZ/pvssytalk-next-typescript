import "../styles/globals.css";

import { AnimatePresence } from "framer-motion";
import Head from "next/head";

export default function App({ Component, pageProps, router }: any) {
  return (
    <>
      <Head>
        <script src="../lib/biskoui-script.js" async />
      </Head>
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </>
  );
}
