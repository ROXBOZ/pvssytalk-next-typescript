// MediaLayout.tsx
import { MediaDetail } from "../../types";
import MediaItem from "../MediaItem";
import React from "react";

interface MediaLayoutProps {
  category: any;
  categorizedMedia: MediaDetail[];
  selectedPain: string;
}

const MediaLayout: React.FC<MediaLayoutProps> = ({
  category,
  categorizedMedia,
  selectedPain,
}: MediaLayoutProps) => {
  const validatedItems = categorizedMedia.filter(
    (mediaItem: MediaDetail) => mediaItem.isValidated === true
  );

  return (
    <div key={category.value} className="media-container">
      <h2 className="h3">{category.title}</h2>
      {validatedItems.map((media: MediaDetail, index: number) => {
        const itemPains: string[] = (media.relatedPain || []).map(
          (p: any) => p.name
        );

        if (
          !selectedPain ||
          (selectedPain && itemPains.includes(selectedPain))
        ) {
          return <MediaItem mediaItem={media} key={index} />;
        }
      })}
    </div>
  );
};

export default MediaLayout;
