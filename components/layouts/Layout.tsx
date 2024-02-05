import Footer from "../Footer";
import Header from "../Header";
import { MenuDetail } from "../../types";
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
      {children}
      <Footer data={footerMenuData} />
    </div>
  );
}

export default Layout;
