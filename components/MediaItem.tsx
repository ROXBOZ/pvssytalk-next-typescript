import Link from "next/link";
import { MediaDetail } from "../types";
import React from "react";

export const MediaItem = ({ mediaItem }: { mediaItem: MediaDetail }) => {
  return (
    <div className="media-item" key={mediaItem._id}>
      <div>
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
        <div className="tag-container">
          {mediaItem.tags &&
            mediaItem.tags.map((tag: any, index: number) => {
              return (
                <div className="tag" key={index}>
                  <span>{tag.name.toLowerCase()}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
