import { GetStaticPaths, GetStaticProps } from "next";
import {
  DirectoryDetails,
  ExerciseDetails,
  GlossaryDetails,
  MediaDetails,
  PainDetail,
  PainDetails,
} from "../types";
import { client } from "../utils/sanity/client";

//PROPS
export const getStaticPropsGlossary: GetStaticProps = async () => {
  try {
    const glossary: GlossaryDetails = await client.fetch(
      '*[_type == "glossary" && !(_id in path("drafts.**"))]{...}'
    );
    const pains: PainDetails = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    return {
      props: { glossary, pains },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { glossary: [], pains: [] },
    };
  }
};
export const getStaticPropsExercises: GetStaticProps = async () => {
  try {
    const exercises: ExerciseDetails = await client.fetch(
      '*[_type == "exercise" && !(_id in path("drafts.**"))]{...}'
    );
    const pains: PainDetails = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    return {
      props: { exercises, pains },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      props: { exercises: [], pains: [] },
    };
  }
};
export const getStaticPropsMedia: GetStaticProps = async () => {
  try {
    const media: MediaDetails = await client.fetch(
      '*[_type == "media" && !(_id in path("drafts.**"))]{...}'
    );
    const pains: PainDetails = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))]{...}'
    );
    return {
      props: { media, pains },
    };
  } catch (error) {
    console.error("Error fetching media:", error);
    return {
      props: { media: [], pains: [] },
    };
  }
};
export const getStaticPropsDirectory: GetStaticProps = async () => {
  try {
    const directory: DirectoryDetails = await client.fetch(
      '*[_type == "directory" && !(_id in path("drafts.**"))]{...}'
    );

    const sortedDirectory = directory.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return {
      props: { directory: sortedDirectory },
    };
  } catch (error) {
    console.error("Error fetching directory:", error);
    return {
      props: { directory: [] },
    };
  }
};
export const getStaticPropsPainGlossary: GetStaticProps = async ({
  params,
}) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedGlossary: GlossaryDetails | null = await client.fetch(
      `*[_type == "glossary"]`
    );

    if (!fetchedPain || !fetchedGlossary) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, glossary: fetchedGlossary },
    };
  } catch (error) {
    console.error("Error fetching glossary:", error);
    return {
      props: { pain: null, glossary: [] },
    };
  }
};
export const getStaticPropsPainExercises: GetStaticProps = async ({
  params,
}) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedExercises: ExerciseDetails | null = await client.fetch(
      `*[_type == "exercise"]`
    );

    if (!fetchedPain || !fetchedExercises) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, exercises: fetchedExercises },
    };
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return {
      props: { pain: null, exercises: [] },
    };
  }
};
export const getStaticPropsPainMedia: GetStaticProps = async ({ params }) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedMedia: MediaDetails[] | null = await client.fetch(
      `*[_type == "media" && !(_id in path("drafts.**"))]`
    );
    if (!fetchedPain || !fetchedMedia) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, media: fetchedMedia },
    };
  } catch (error) {
    console.error("Error fetching medias:", error);
    return {
      props: { pain: null, media: [] },
    };
  }
};
export const getStaticPropsPainDirectory: GetStaticProps = async ({
  params,
}) => {
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
      props: { pain: null, directory: [] },
    };
  }
};

//PATH
export const getStaticPathsPain: GetStaticPaths = async () => {
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
