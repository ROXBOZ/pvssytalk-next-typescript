// import React, { useEffect, useState } from "react";

// import Link from "next/link";

// const Start = () => {
//   const [currentURL, setCurrentURL] = useState("");

//   useEffect(() => {
//     setCurrentURL(window.location.href);
//   }, []);
//   return (
//     <div id="start" className="double-column-container">
//       <div
//         style={{ borderTop: "0" }}
//         className={`${currentURL.endsWith("douleurs") && "no-border"}`}
//       >
//         {currentURL.endsWith("/commencer") ? (
//           <>
//             <h1>Par où commencer ?</h1>
//           </>
//         ) : (
//           <h2>Par où commencer ?</h2>
//         )}
//       </div>
//       <div>
//         <nav className="nav-directory">
//           <Link href="commencer/introduction">Introduction aux douleurs</Link>
//           <Link href="commencer/guide">Guide d’auto-observation</Link>
//           <Link href="commencer/consultation">Qui consulter ?</Link>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Start;
