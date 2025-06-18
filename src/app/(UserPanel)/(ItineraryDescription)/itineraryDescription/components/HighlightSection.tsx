import React from "react";
import HighlightCard from "./HighlightCard";
import { Highlight } from "../ItineraryDescriptionPage";

interface HighlightSectionProps {
  highlights: Highlight[];
}

const HighlightSection: React.FC<HighlightSectionProps> = ({ highlights }) => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 md:px-10 lg:px-16 rounded-xl mb-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10">
        Highlights
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {Array.isArray(highlights) && highlights.length > 0 ? (
          highlights.map((highlight, index) => (
            <HighlightCard key={index} image={highlight.image} />
          ))
        ) : (
          <p className="text-gray-400 text-center">No highlights available.</p>
        )}
      </div>
    </div>
  );
};

export default HighlightSection;