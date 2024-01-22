import "../styles/globals.css";

import { AuthContextProvider } from "../context/authContext";
import Breadcrumbs from "../components/Breadcrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MenuDetail } from "../types";
import { client } from "../config/sanity/client";
import { useRouter } from "next/router";

function MyApp({
  Component,
  pageProps,
  headerMenu,
}: {
  Component: any;
  pageProps: any;
  headerMenu: MenuDetail[];
}) {
  const router = useRouter();
  const isHomepage = router.pathname === "/";

  console.log("headerMenu", headerMenu);

  return (
    <>
      <AuthContextProvider>
        {isHomepage ? null : <Header />}
        <Breadcrumbs />
        <div>
          <Component {...pageProps} />
        </div>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;

export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[]->{title, slug{current}}}'
    );

    return {
      props: { headerMenu },
    };
  } catch (error) {
    console.error("Error fetching:", error);
  }
};
