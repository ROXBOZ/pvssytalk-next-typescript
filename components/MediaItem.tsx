import Link from "next/link";
import { MediaDetail } from "../types";
import React from "react";

export const MediaItem = ({ mediaItem }: { mediaItem: MediaDetail }) => {
  return (
    <div className="media-item" key={mediaItem._id}>
      <p>
        {mediaItem.url ? (
          <Link href={mediaItem.url} target="_blank">
            <strong>
              <em>{mediaItem.title}</em>
            </strong>
          </Link>
        ) : (
          <span>
            <strong>
              <em>{mediaItem.title}</em>
            </strong>
          </span>
        )}
        {mediaItem.author && <span>, {mediaItem.author}</span>}
        {mediaItem.editor && <span>, {mediaItem.editor}</span>}
        {mediaItem.year && <span> ({mediaItem.year})</span>}
        <div className="tag-container" style={{ margin: "1rem 0" }}>
          {mediaItem.tags &&
            mediaItem.tags.map((tag: any, index: number) => {
              return (
                <div className="tag" key={index}>
                  <span>{tag.name}</span>
                </div>
              );
            })}
        </div>
      </p>
    </div>
  );
};

export default MediaItem;
