// import Image from "next/image";
// import { InfoPageDetail } from "../../types";
// import { PortableText } from "@portabletext/react";
// import StartNav from "../startNav";
// import { urlFor } from "../../config/sanity/client";

// export const InfoPageHeader = ({ page }: { page: InfoPageDetail }) => {
//   return (
//     <div className="double-column-containers-group">
//       <div className="double-column-container">
//         <div>
//           <h1>{page.title}</h1>
//           <StartNav />
//           {page.image && (
//             <Image
//               className="intro-image"
//               src={urlFor(page.image.asset._ref).url()}
//               width={500}
//               height={300}
//               alt={page.image.alternativeText}
//             />
//           )}
//         </div>
//         <div className="bigger-text">
//           <PortableText value={page.subtitle as any} />
//         </div>
//       </div>
//     </div>
//   );
// };
