import React from "react";
import { client } from "../config/sanity/client";

function sitemap({ pages, pains }: { pages: any; pains: any }) {
  console.log("pages :", pages);
  console.log("pains :", pains);

  const allUrls: string[] = [];
  const baseUrl = "https://www.pvssy-talk.org";
  console.log("baseUrl :", baseUrl);
  console.log("allUrls :", allUrls);

  pages.forEach((page: any) => {
    allUrls.push(`${baseUrl}/${page.slug.current}`);
  });

  pains.forEach((pain: any) => {
    allUrls.push(`${baseUrl}/douleurs/${pain.slug.current}`);
    allUrls.push(`${baseUrl}/douleurs/${pain.slug.current}/annuaire`);
    allUrls.push(`${baseUrl}/douleurs/${pain.slug.current}/exercices`);
    allUrls.push(`${baseUrl}/douleurs/${pain.slug.current}/glossaire`);
    allUrls.push(`${baseUrl}/douleurs/${pain.slug.current}/medias`);
  });

  allUrls.push(`${baseUrl}/ressources/annuaire`);
  allUrls.push(`${baseUrl}/ressources/exercices`);
  allUrls.push(`${baseUrl}/ressources/glossaire`);
  allUrls.push(`${baseUrl}/ressources/medias`);

  const sitemapXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          (url) =>
            `<url><loc>${url}</loc><lastmod>2024-05-05</lastmod><changefreq>monthly</changefreq></url>`
        )
        .join("\n")}
    </urlset>
  `;
  console.log("sitemapXml :", sitemapXml);

  return sitemapXml;
}

export default sitemap;

export function generateSitemap({ pages, pains }: { pages: any; pains: any }) {}

export const getStaticProps = async () => {
  try {
    const pains: any = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]'
    );
    const pages: any = await client.fetch(
      '*[_type == "page" && !(_id in path("drafts.**"))]'
    );

    return {
      props: { pains, pages },
    };
  } catch (error) {
    return {
      props: { pages: [], pains: [] },
    };
  }
};
