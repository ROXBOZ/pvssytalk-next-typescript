import type { NextPage } from "next";
import Tagline from "../components/Tagline";
import Marquee from "../components/Marquee";
import Pains from "./douleurs";
import Ressources from "./ressources";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Tagline />
      <Marquee />
      <div>
        <h2>Avoir mal n’est pas normal</h2>
        <p>
          Les douleurs sexuelles concernent <u>une personne à vulve sur cinq</u>
          . Elles peuvent toucher à la vulve, au vagin, et s’étendre au delà de
          l’utérus. Ces douleurs peuvent avoir des répercussions importantes sur
          différents aspects de sa vie, sa sexualité, ou sa santé mentale et
          physique. <u>Avoir mal n’est pas normal</u>. Encore moins lorsqu’il
          s’agit de ton plaisir et ta sexualité. N’hésite pas à t’informer et
          t’entourer de soignant·exs <em>safe</em> pour t’accompagner dans ton
          parcours de soin.
        </p>
      </div>
      <div>
        <h2>Par où commencer</h2>
        <nav className="nav-directory">
          <Link href="start/introduction">Introduction aux douleurs</Link>
          <Link href="start/guide">Guide d’auto-observation</Link>
          <Link href="start/consultation">Qui consulter ?</Link>
        </nav>
      </div>
      <Pains />
      <Ressources />
    </>
  );
};

export default Home;
