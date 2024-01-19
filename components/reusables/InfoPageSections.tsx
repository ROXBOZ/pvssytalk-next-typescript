// import Image from "next/image";
// import { PortableText } from "@portabletext/react";
// import React from "react";
// import { urlFor } from "../../config/sanity/client";

// interface InfoPageSectionProps {
//   sectionTitle: string;
//   sectionContent: any;
//   sectionImage?: {
//     asset: any;
//     alternativeText: string;
//   };
// }

// const InfoPageSection = ({ data }: { data: InfoPageSectionProps[] }) => {
//   return (
//     <>
//       {data.map((section, index: number) => {
//         return (
//           <div key={index} className="double-column-container">
//             <div>
//               <h2>{section.sectionTitle}</h2>
//               {section.sectionImage && (
//                 <Image
//                   style={{ width: "100%", height: "auto" }}
//                   className={section.sectionTitle}
//                   src={urlFor(section.sectionImage.asset._ref).url()}
//                   width={500}
//                   height={300}
//                   alt={section.sectionImage.alternativeText}
//                 />
//               )}
//             </div>
//             <div>
//               <PortableText value={section.sectionContent as any} />
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default InfoPageSection;
