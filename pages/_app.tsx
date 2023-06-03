import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
import Breadcrumbs from "../components/Breadcrumbs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <Component {...pageProps} />
      <Footer />
      <CookieBanner />
    </>
  );
}

export default MyApp;
