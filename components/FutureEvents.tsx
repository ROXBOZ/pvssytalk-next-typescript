import { AgendaDetail } from "../types";
import React from "react";

interface FutureEventsProps {
  events: AgendaDetail[];
}

function FutureEvents({ events }: FutureEventsProps) {
  const formatFrenchDate = (dateString: string) => {
    try {
      const eventDate = new Date(dateString);
      if (isNaN(eventDate.getTime())) {
        console.error(`Invalid date string: ${dateString}`);
        return "Invalid Date";
      }

      const frenchLocale = "fr-FR";
      const dateFormatter = new Intl.DateTimeFormat(frenchLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return dateFormatter.format(eventDate);
    } catch (error) {
      console.error(`Error formatting date: ${error}`);
      return "Error";
    }
  };

  return (
    <div className="events">
      {events.map((event: AgendaDetail, index: number) => {
        console.log("event :", event);
        return (
          <div className="event" key={index}>
            <p className="h4">{event.title}</p>
            <span>{event.region}</span>{" "}
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
          </div>
        );
      })}
    </div>
  );
}

export default FutureEvents;
