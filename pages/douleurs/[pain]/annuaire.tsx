import React from "react";
import PainNav from "../../../components/painNav";
import { DirectoryDetail, DirectoryDetails, PainDetail } from "../../../types";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../../utils/sanity/client";

const Directory = ({
  pain,
  directory,
}: {
  pain: PainDetail;
  directory: DirectoryDetail[];
}) => {
  return (
    <div>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>
              Annuaire{" "}
              <a href="./" className="colored logo">
                {pain.name}
              </a>
            </h1>
            <PainNav pain={pain} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs: string[] = await client.fetch(
      `*[_type == "pain"].slug.current`
    );

    const paths = slugs.map((slug) => ({
      params: { pain: slug },
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedDirectory: DirectoryDetails[] | null = await client.fetch(
      `*[_type == "directory" && !(_id in path("drafts.**"))]`
    );
    if (!fetchedPain || !fetchedDirectory) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, directory: fetchedDirectory },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { pain: null, media: [] },
    };
  }
};
