import { DirectoryDetails, EventDetail } from "../types";

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
