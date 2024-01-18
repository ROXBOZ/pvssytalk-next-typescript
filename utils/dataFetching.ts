import {
  DirectoryDetails,
  EventDetail,
  ExerciseDetails,
  GlossaryDetails,
  InfoPageDetail,
  MediaDetails,
  PainDetail,
} from "../types";

import { GetStaticProps } from "next";
import { client } from "../config/sanity/client";

//PATH
export const getStaticPathsPain = async () => {
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

/*----PAINS----*/
export const getStaticPropsPains = async () => {
  try {
    const pains: PainDetail[] = await client.fetch(
      '*[_type == "pain" && !(_id in path("drafts.**"))] {..., filters}'
    );
    return {
      props: { pains },
    };
  } catch (error) {
    console.error("Error fetching pains:", error);
    return {
      props: { pains: [] },
    };
  }
};
/*----GENERAL RESSOURCES----*/

export const getStaticPropsExercises: GetStaticProps = async () => {
  try {
    const exercises: ExerciseDetails = await client.fetch(
      '*[_type == "exercise" && !(_id in path("drafts.**"))]{...}'
    );
    const pains: PainDetail = await client.fetch(
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

// POST DIRECTORY ENTRY
export const createEntry = async (entry: DirectoryDetails) => {
  try {
    const createdEntry = await client.create({
      _type: "directory",
      ...entry,
    });
    return createdEntry;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};

/*----PAINS RESSOURCES----*/

export const getStaticPropsPainGlossary: GetStaticProps = async ({
  params,
}) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]{
        ...,
        body[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              ...,
             "slug": @->slug
            }
          }
        }
      }`,
      { currentSlug: pain }
    );
    const fetchedGlossary: GlossaryDetails[] | null = await client.fetch(
      `*[_type == "glossary" && references($painId)]`,
      { painId: fetchedPain?._id }
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
    const fetchedExercises: ExerciseDetails[] | null = await client.fetch(
      `*[_type == "exercise" && references($painId)]`,
      { painId: fetchedPain?._id }
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
export const getStaticPropsPainMedias: GetStaticProps = async ({ params }) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedMedias: MediaDetails[] | null = await client.fetch(
      `*[_type == "media" && references($painId)]`,
      { painId: fetchedPain?._id }
    );

    if (!fetchedPain || !fetchedMedias) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, medias: fetchedMedias },
    };
  } catch (error) {
    console.error("Error fetching medias:", error);
    return {
      props: { pain: null, medias: [] },
    };
  }
};
export const getStaticPropsPainDirectories: GetStaticProps = async ({
  params,
}) => {
  try {
    const { pain } = params!;
    const fetchedPain: PainDetail | null = await client.fetch(
      `*[_type == "pain" && slug.current == $currentSlug][0]`,
      { currentSlug: pain }
    );
    const fetchedDirectories: DirectoryDetails[] | null = await client.fetch(
      `*[_type == "directory" && references($painId)]`,
      { painId: fetchedPain?._id }
    );

    if (!fetchedPain || !fetchedDirectories) {
      return {
        notFound: true,
      };
    }

    return {
      props: { pain: fetchedPain, directories: fetchedDirectories },
    };
  } catch (error) {
    console.error("Error fetching directories:", error);
    return {
      props: { pain: null, directories: [] },
    };
  }
};

/*----OTHER PAGES----*/

export const getStaticPropsAboutPage = async () => {
  try {
    const AboutPage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "d1ec0f67-914d-4351-8695-4a50d0b7759c" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { AboutPage },
    };
  } catch (error) {
    console.error("Error fetching AccessibilityPage:", error);
    return {
      props: { AccessibilityPage: [] },
    };
  }
};
export const getStaticPropsMembersPage = async () => {
  try {
    const MembersPage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "1c05b6e2-6165-4162-94dd-37fdd58c89fb" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { MembersPage },
    };
  } catch (error) {
    console.error("Error fetching MembersPage:", error);
    return {
      props: { MembersPage: [] },
    };
  }
};
export const getStaticPropsDonatePage = async () => {
  try {
    const DonatePage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "f501afa0-06d7-428b-9ad0-11b853d96896" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { DonatePage },
    };
  } catch (error) {
    console.error("Error fetching DonatePage:", error);
    return {
      props: { DonatePage: [] },
    };
  }
};
export const getStaticPropsCreditPage = async () => {
  try {
    const CreditPage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "455abeba-d503-4fef-b0ec-4bd24fa437a6" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { CreditPage },
    };
  } catch (error) {
    console.error("Error fetching CreditPage:", error);
    return {
      props: { CreditPage: [] },
    };
  }
};
export const getStaticPropsConditionsPage = async () => {
  try {
    const ConditionsPage: InfoPageDetail[] = await client.fetch(
      '*[_type == "page" && _id== "10cdf147-5d9f-4333-8bae-a27929ade630" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { ConditionsPage },
    };
  } catch (error) {
    console.error("Error fetching ConditionsPage:", error);
    return {
      props: { ConditionsPage: [] },
    };
  }
};
/*----AGENDA----*/
// GET ALL EVENTS
export const getStaticPropsEvents = async () => {
  try {
    const events: EventDetail[] = await client.fetch(
      '*[_type == "events" && !(_id in path("drafts.**"))]'
    );
    return {
      props: { events },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: { events: [] },
    };
  }
};
// POST NEW EVENT
export const createEvent = async (event: EventDetail) => {
  try {
    const createdEvent = await client.create({
      _type: "events",
      ...event,
    });
    return createdEvent;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
