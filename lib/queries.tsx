import { client } from "../config/sanity/client";

export const fetchHeaderMenu = async () => {
  return await client.fetch(
    '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {..., _type == "map" => {content[]{..., pages[]->{title, slug{current}}}}, _type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
  );
};

export const fetchFooterMenu = async () => {
  return await client.fetch(
    '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
  );
};
