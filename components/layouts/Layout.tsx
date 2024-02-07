import Breadcrumbs from "../Breadcrumbs";
import Footer from "../Footer";
import Header from "../Header";
import { MenuDetail } from "../../types";
import PageTransition from "./PageTransition";
import React from "react";

function Layout({
  children,
  headerMenu,
  footerMenu,
}: {
  children: any;
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) {
  const headerMenuData = headerMenu[0].headerMenu;
  const footerMenuData = footerMenu[0].footerMenu;

  return (
    <>
      <Header data={headerMenuData} />
      <Breadcrumbs />
      <PageTransition>{children}</PageTransition>
      <Footer data={footerMenuData} />
    </>
  );
}

export default Layout;
