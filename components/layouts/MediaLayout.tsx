// MediaLayout.tsx
import { MediaDetail } from "../../types";
import MediaItem from "../MediaItem";
import React from "react";

interface MediaLayoutProps {
  category: any;
  categorizedMedia: MediaDetail[];
}

function MediaLayout({ category, categorizedMedia }: MediaLayoutProps) {
  return (
    <div key={category.value} className="media-container">
      <h2 className="h3">{category.title}</h2>
      {categorizedMedia.map((media: MediaDetail, index: number) => (
        <MediaItem mediaItem={media} key={index} />
      ))}
    </div>
  );
}

export default MediaLayout;
