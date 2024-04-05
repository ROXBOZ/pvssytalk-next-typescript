import Breadcrumbs from "../Breadcrumbs";
import CustomHead from "../CustomHead";
import Footer from "../Footer";
import Header from "../Header";
import { MenuDetail } from "../../types";
import React from "react";

function Layout({
  children,
  headerMenu,
  footerMenu,
  painsSlugs,
  seo,
  marquee,
}: {
  children: any;
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  painsSlugs?: any;
  seo?: any;
  marquee: any;
}) {
  const headerMenuData = headerMenu[0].headerMenu;
  const footerMenuData = footerMenu[0].footerMenu;

  return (
    <>
      <CustomHead seo={seo} />
      <Header data={headerMenuData} pains={painsSlugs} marquee={marquee} />
      <Breadcrumbs />

      {children}
      <Footer data={footerMenuData} />
    </>
  );
}

export default Layout;
