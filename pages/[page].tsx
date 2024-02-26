import { InfoPageDetail, MenuDetail, PainDetail } from "../types";
import { client, urlFor } from "../config/sanity/client";
import { fetchFooterMenu, fetchHeaderMenu } from "../lib/queries";

import Image from "next/image";
import Layout from "../components/layouts/Layout";
import { PortableText } from "@portabletext/react";

const Page = ({
  headerMenu,
  page,
  footerMenu,
  painsSlugs,
}: {
  headerMenu: MenuDetail[];
  page: any;
  footerMenu: MenuDetail[];
  painsSlugs: any;
}) => {
  return (
    <Layout
      seo={page.seo}
      headerMenu={headerMenu}
      painsSlugs={painsSlugs}
      footerMenu={footerMenu}
    >
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>{page.title}</h1>

            {page.image && (
              <Image
                className="intro-image"
                src={urlFor(page.image.asset._ref).url()}
                width={500}
                height={300}
                alt={page.image.alternativeText}
              />
            )}
          </div>
          <div className="bigger-text">
            <PortableText value={page.subtitle as any} />
          </div>
        </div>
      </div>

      {page.sections.map((section: any, index: number) => {
        return (
          <div key={index} className="double-column-container">
            <div>
              <h2>{section.sectionTitle}</h2>
              {section.sectionImage && (
                <Image
                  style={{ width: "100%", height: "auto" }}
                  className={section.sectionTitle}
                  src={urlFor(section.sectionImage.asset._ref).url()}
                  width={500}
                  height={300}
                  alt={section.sectionImage.alternativeText}
                />
              )}
            </div>
            <div>
              <PortableText value={section.sectionContent as any} />
            </div>
          </div>
        );
      })}
    </Layout>
  );
};

export default Page;

export const getStaticPaths = async () => {
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "page"].slug.current`
    );

    const paths = slugs.map((slug) => ({
      params: { page: slug },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps = async ({
  params,
}: {
  params: { page: string };
}) => {
  try {
    const { page } = params;
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const [currentPage]: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && slug.current == $page && !(_id in path("drafts.**"))]{...}',
      { page }
    );
    const painsSlugs: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {name, slug {current}, description}'
    );
    return {
      props: { page: currentPage, headerMenu, footerMenu, painsSlugs },
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
    return {
      props: { page: null },
    };
  }
};
