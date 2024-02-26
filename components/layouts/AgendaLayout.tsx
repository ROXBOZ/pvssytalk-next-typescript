import { AgendaDetail } from "../../types";
import { PortableText } from "@portabletext/react";
import React from "react";

function AgendaLayout({
  event,
  selectedPain,
  selectedRegion,
}: {
  event: AgendaDetail;
  selectedPain: string;
  selectedRegion: string;
}) {
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

  const itemPains: string[] = (event.relatedPain || []).map((p: any) => p.name);
  const itemRegions = event.region;

  console.log("event", event);

  if (
    (selectedPain && !selectedRegion && itemPains.includes(selectedPain)) ||
    (selectedRegion &&
      !selectedPain &&
      itemRegions &&
      itemRegions.includes(selectedRegion)) ||
    (!selectedRegion && !selectedPain) ||
    (selectedRegion &&
      selectedPain &&
      itemPains.includes(selectedPain) &&
      itemRegions.includes(selectedRegion)) ||
    (selectedRegion && event.eventLocation === "online")
  ) {
    return (
      <div>
        <h2 className="h3">{event.title}</h2>

        {event.eventDuration && event.eventDuration === "oneDay" && (
          <p style={{ backgroundColor: "orange" }}>
            <span>{formatFrenchDate(event.eventDate)}</span>, de{" "}
            <span>{event.eventStartTime.replace(":", "h")}</span> à{" "}
            <span>{event.eventEndTime.replace(":", "h")}</span>
          </p>
        )}

        {event.eventDuration && event.eventDuration === "manyDays" && (
          <p style={{ backgroundColor: "yellow" }}>
            Du <span>{formatFrenchDate(event.eventStartDate)}</span> au{" "}
            <span>{formatFrenchDate(event.eventEndDate)}</span>
          </p>
        )}

        {event.shortDef && (
          <div style={{ backgroundColor: "lightgreen" }}>
            <PortableText value={event.shortDef as any} />
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default AgendaLayout;
