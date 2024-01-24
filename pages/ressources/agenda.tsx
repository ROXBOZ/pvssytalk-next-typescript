import Filters, { pains } from "../../components/reusables/Filters";
import React, { useState } from "react";

import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import { MenuDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import RessourceNav from "../../components/ressourceNav";
import { client } from "../../config/sanity/client";

interface AgendaDetail {
  title: string;
  eventDuration: "oneDay" | "manyDays";
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventStartDate: string;
  eventEndDate: string;
  shortDef: any;
}

const Agenda = ({
  agenda,
  headerMenu,
  footerMenu,
}: {
  agenda: AgendaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const formatFrenchDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    const frenchLocale = "fr-FR";
    const dateFormatter = new Intl.DateTimeFormat(frenchLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return dateFormatter.format(eventDate);
  };
  return (
    <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
      <Breadcrumbs />
      <div className="double-column-containers-group">
        <div className="double-column-container">
          <div className="fixed-container">
            <h1>
              Agenda <sup>{agenda.length}</sup>
            </h1>
            <RessourceNav />
            <Filters
              filterOptions={pains}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          </div>
          <div>
            <button className="primary-button">recommander un évènement</button>
            {agenda.map((event: AgendaDetail, index: number) => {
              console.log("event", event);
              return (
                <div key={index}>
                  <h2 className="h3">{event.title}</h2>

                  {event.eventDuration && event.eventDuration === "oneDay" && (
                    <p style={{ backgroundColor: "orange" }}>
                      <span>{formatFrenchDate(event.eventDate)}</span>, de{" "}
                      <span>{event.eventStartTime.replace(":", "h")}</span> à{" "}
                      <span>{event.eventEndTime.replace(":", "h")}</span>
                    </p>
                  )}

                  {event.eventDuration &&
                    event.eventDuration === "manyDays" && (
                      <p style={{ backgroundColor: "yellow" }}>
                        Du <span>{formatFrenchDate(event.eventStartDate)}</span>{" "}
                        au <span>{formatFrenchDate(event.eventEndDate)}</span>
                      </p>
                    )}

                  {event.shortDef && (
                    <div style={{ backgroundColor: "lightgreen" }}>
                      <PortableText value={event.shortDef as any} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Agenda;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {headerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const footerMenu: MenuDetail[] = await client.fetch(
      '*[_type == "menu" && !(_id in path("drafts.**"))] {footerMenu[] {_type == "customLink" => {_type, isAction, title,link}, _type == "pageReference" => {...}->}}'
    );
    const event: AgendaDetail[] = await client.fetch(
      `*[_type == "event" && !(_id in path("drafts.**"))]`
    );

    return {
      props: { headerMenu, footerMenu, agenda: event },
    };
  } catch (error) {
    console.error("Error fetching agenda:", error);
  }
};
