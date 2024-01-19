import "../styles/globals.css";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/authContext";
import Breadcrumbs from "../components/Breadcrumbs";
import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomepage = router.pathname === "/";
  return (
    <>
      <AuthContextProvider>
        {isHomepage ? null : <Header />}
        <Breadcrumbs />
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />
        <CookieBanner />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
