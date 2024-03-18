import Link from "next/link";
import { useRouter } from "next/router";

export default function Breadcrumbs() {
  const router = useRouter();

  if (router.pathname === "/") {
    return null;
  }

  const crumbs = router.asPath
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, arr) => {
      const currentLink = `/${arr.slice(0, index + 1).join("/")}`;
      const decodedCrumb = decodeURIComponent(crumb);

      const isLastCrumb = index === arr.length - 1;

      return (
        <div className="crumb" key={crumb}>
          {isLastCrumb ? (
            <span>
              {decodedCrumb
                .replaceAll("%C3%A9", "é")
                .replaceAll("%20", " ")
                .replaceAll("%C3%A8", "è")
                .replaceAll("%C3%A0", "à")
                .replaceAll("-", " ")
                .replaceAll("%C2%A0", " ")}
            </span>
          ) : (
            <Link href={currentLink}>
              {decodedCrumb
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

  const homeLink = "/";
  const homeCrumb = (
    <div className="crumb" key="home">
      <Link href={homeLink}>accueil</Link>
    </div>
  );

  return (
    <div className="breadcrumbs">
      {homeCrumb}
      {crumbs}
    </div>
  );
}
