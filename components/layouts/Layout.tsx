import Footer from "../Footer";
import Header from "../Header";
import { MenuDetail } from "../../types";
import Page from "../../pages/[page]";
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
    <div className="layout">
      <Header data={headerMenuData} />
      <PageTransition>{children}</PageTransition>
      <Footer data={footerMenuData} />
    </div>
  );
}

export default Layout;
