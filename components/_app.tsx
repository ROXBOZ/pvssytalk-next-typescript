import "../styles/globals.css";

import { AnimatePresence } from "framer-motion";

function MyApp({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  return (
    <AnimatePresence mode="wait">
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  );
}

export default MyApp;
