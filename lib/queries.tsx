import { client } from "../config/sanity/client";

export const fetchHeaderMenu = async () => {
  return await client.fetch(
    '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {..., pages[]->{title, slug{current}, description}, _type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
  );
};

export const fetchFooterMenu = async () => {
  return await client.fetch(
    '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
  );
};
