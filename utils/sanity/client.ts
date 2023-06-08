import { createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "jk2z8dh4",
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2021-10-21",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// const builder = imageUrlBuilder(client);
// function urlFor(source: string) {
//   return builder.image(source);
// }

export { client };
