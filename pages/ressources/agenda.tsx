import Filters, { pains } from "../../components/reusables/Filters";
import React, { useState } from "react";
import { fetchFooterMenu, fetchHeaderMenu } from "../../lib/queries";

import Breadcrumbs from "../../components/Breadcrumbs";
import CustomHead from "../../components/CustomHead";
import Layout from "../../components/layouts/Layout";
import { MenuDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import RessourceNav from "../../components/RessourceNav";
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
  seo,
}: {
  agenda: AgendaDetail[];
  headerMenu: MenuDetail[];
  footerMenu: MenuDetail[];
  seo: any;
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
    <>
      <CustomHead seo={seo[0].agenda} />
      <Layout headerMenu={headerMenu} footerMenu={footerMenu}>
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
              <button className="primary-button">
                recommander un évènement
              </button>
              {agenda.map((event: AgendaDetail, index: number) => {
                return (
                  <div key={index}>
                    <h2 className="h3">{event.title}</h2>

                    {event.eventDuration &&
                      event.eventDuration === "oneDay" && (
                        <p style={{ backgroundColor: "orange" }}>
                          <span>{formatFrenchDate(event.eventDate)}</span>, de{" "}
                          <span>{event.eventStartTime.replace(":", "h")}</span>{" "}
                          à <span>{event.eventEndTime.replace(":", "h")}</span>
                        </p>
                      )}

                    {event.eventDuration &&
                      event.eventDuration === "manyDays" && (
                        <p style={{ backgroundColor: "yellow" }}>
                          Du{" "}
                          <span>{formatFrenchDate(event.eventStartDate)}</span>{" "}
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
    </>
  );
};

export default Agenda;
export const getStaticProps = async () => {
  try {
    const headerMenu: MenuDetail[] = await fetchHeaderMenu();
    const footerMenu: MenuDetail[] = await fetchFooterMenu();
    const event: AgendaDetail[] = await client.fetch(
      `*[_type == "event" && !(_id in path("drafts.**"))]`
    );
    const seo: any = await client.fetch(
      '*[_type == "seoManager" && !(_id in path("drafts.**"))]'
    );

    return {
      props: { headerMenu, footerMenu, agenda: event, seo },
    };
  } catch (error) {
    console.error("Error fetching agenda:", error);
  }
};
