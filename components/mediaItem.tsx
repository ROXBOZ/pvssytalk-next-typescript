import React from "react";
import { MediaDetail } from "../types";

export const MediaItem = ({ mediaItem }: { mediaItem: MediaDetail }) => {
  return (
    <div className="media-item" key={mediaItem._id}>
      <p>
        {mediaItem.author}, {mediaItem.year && <>({mediaItem.year}). </>}
        {mediaItem.url ? (
          <a href={mediaItem.url} target="_blank">
            <strong>
              <em>{mediaItem.title}</em>
            </strong>
          </a>
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
