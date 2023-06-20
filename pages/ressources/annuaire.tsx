import React from "react";
import RessourceNav from "../../components/ressourceNav";
import { GetStaticProps } from "next";
import { DirectoryDetails } from "../../types";
import { client } from "../../utils/sanity/client";

const Directory = ({ directory }: { directory: DirectoryDetails }) => {
  console.log("directory :", directory);
  return (
    <div className="double-column-containers-group">
      <div className="double-column-container">
        <div>
          <h1>Annuaire</h1>
          <RessourceNav />
        </div>
      </div>
    </div>
  );
};

export default Directory;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const directory: DirectoryDetails = await client.fetch(
      '*[_type == "directory" && !(_id in path("drafts.**"))]{...}'
    );

    return {
      props: { directory },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { glossary: [] },
    };
  }
};
