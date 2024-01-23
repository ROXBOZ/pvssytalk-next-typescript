import { MenuDetail } from "../types";
import { client } from "../config/sanity/client";

export async function fetchMenuData(): Promise<{
  headerMenuData: MenuDetail[];
  footerMenuData: MenuDetail[];
}> {
  try {
    const headerMenuQuery = `*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title, link}, _type == "pageReference" => {...}->}}`;
    const headerMenuData = await client.fetch(headerMenuQuery);

    const footerMenuQuery = `*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title, link}, _type == "pageReference" => {...}->}}`;
    const footerMenuData = await client.fetch(footerMenuQuery);

    return {
      headerMenuData,
      footerMenuData,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      headerMenuData: [],
      footerMenuData: [],
    };
  }
}
