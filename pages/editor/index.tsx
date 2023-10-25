import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import EditAgenda from "../../components/EditAgenda";
import EditDirectory from "../../components/EditDirectory";
import { GetStaticProps } from "next";
import { getStaticPropsEvents } from "../../utils/dataFetching";
import { DirectoryDetails, EventDetail } from "../../types";

const User = ({
  events,
  directory,
}: {
  events: EventDetail[];
  directory: DirectoryDetails[];
}) => {
  const { existingUserCredential, logout } = useContext(AuthContext);
  const [showAgenda, setShowAgenda] = useState(false);
  const [showDirectory, setShowDirectory] = useState(true);

  return (
    <>
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div>
            <h1>
              Compte <sup>editor</sup>
            </h1>
            {existingUserCredential &&
              existingUserCredential.emailVerified === true && (
                <>
                  <nav className="nav-directory user">
                    <a
                      onClick={() => {
                        setShowDirectory(true);
                        setShowAgenda(false);
                      }}
                    >
                      <span>
                        Annuaire <sup>editor</sup>
                      </span>
                    </a>
                    <a
                      onClick={() => {
                        setShowAgenda(true);
                        setShowDirectory(false);
                      }}
                    >
                      <span>
                        Agenda <sup>editor</sup>
                      </span>
                    </a>
                    <a href="devenir-membre">Devenir membre</a>
                    <a href="faire-un-don">Faire un don</a>
                  </nav>

                  <p style={{ color: "red" }}>proposer event doesnt work yet</p>
                  <p style={{ color: "red" }}>
                    description event should be rich text
                  </p>
                  <p style={{ color: "red" }}>
                    send info to admin of who sent what
                  </p>
                  <p style={{ color: "red" }}>send confirmation per email</p>
                  <p style={{ color: "red" }}>
                    fix required conditions in sanity
                  </p>
                  <p style={{ color: "red" }}>warn admin there is new entry</p>
                  <p style={{ color: "red" }}>
                    user credential remains if refresh but not if close session{" "}
                  </p>
                  <button onClick={logout}>
                    <span>Déconnexion</span>
                  </button>
                </>
              )}
          </div>
          <div>
            {existingUserCredential &&
            existingUserCredential.emailVerified === true ? (
              <>
                {showAgenda ? (
                  <EditAgenda />
                ) : // <EditAgenda events={events} />
                showDirectory ? (
                  // <EditDirectory directory={directory} />
                  <EditDirectory />
                ) : (
                  ""
                )}
              </>
            ) : (
              <main>
                <p className="msg warning">
                  <a href="se-connecter">Connectez-vous</a> pour accéder à cette
                  page.
                </p>
              </main>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
export const getStaticProps: GetStaticProps = getStaticPropsEvents;
