import Link from "next/link";
import { MediaDetail } from "../types";
import React from "react";

export const MediaItem = ({ mediaItem }: { mediaItem: MediaDetail }) => {
  return (
    <div className="media-item" key={mediaItem._id}>
      <p>
        {mediaItem.author}, {mediaItem.year && <>({mediaItem.year}). </>}
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
            ,
          </span>
        )}
        {mediaItem.editor && <span> {mediaItem.editor}</span>}
      </p>
    </div>
  );
};

export default MediaItem;
