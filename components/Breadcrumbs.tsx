import { useRouter } from "next/router";
import Link from "next/link";

export default function Breadcrumbs() {
  const router = useRouter();

  let currentLink = "";

  if (router.pathname === "/") {
    return null;
  }

  const crumbs = router.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, arr) => {
      currentLink += `/${crumb}`;
      const isLastCrumb = index === arr.length - 1;

      return (
        <div className="crumb" key={crumb}>
          {isLastCrumb ? (
            <span>
              {crumb
                .replaceAll("%C3%A9", "é")
                .replaceAll("%20", " ")
                .replaceAll("%C3%A8", "è")
                .replaceAll("%C3%A0", "à")
                .replaceAll("-", " ")
                .replaceAll("%C2%A0", " ")}
            </span>
          ) : (
            <Link href={currentLink}>
              {crumb
                .replaceAll("%C3%A9", "é")
                .replaceAll("%20", " ")
                .replaceAll("%C3%A8", "è")
                .replaceAll("%C3%A0", "à")
                .replaceAll("-", " ")
                .replaceAll("%C2%A0", " ")}
            </Link>
          )}
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
}
