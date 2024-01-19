import "../styles/globals.css";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/authContext";
import Breadcrumbs from "../components/Breadcrumbs";
import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { firebaseApp } from "../config/firebase/firebase-config";

function MyApp({ Component, pageProps }: AppProps) {
  // console.log("firebaseApp :", firebaseApp);
  return (
    <>
      <AuthContextProvider>
        {/* <Header /> */}
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
