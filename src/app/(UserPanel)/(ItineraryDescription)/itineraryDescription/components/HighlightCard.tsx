import React from "react";
import { Highlight } from "../ItineraryDescriptionPage";

const HighlightCard: React.FC<Highlight> = ({ image }) => {
  return (
    <div className="w-full sm:w-80 md:w-96 max-w-full p-2">
      <div className="rounded-xl overflow-hidden shadow-lg h-full bg-white">
        <div className="relative h-60 overflow-hidden">
          <img
            src={image?.[0] || "/placeholder.jpg"}
            alt="Highlight"
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;


// const HighlightCard: React.FC<Highlight> = ({
//   image,
//   author,
//   title,
//   description,
// }) => {
//   return (
//     <div className="w-full h-full md:w-1/3 p-4">
//       <div className="relative rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
//         <div className="relative h-[70%] overflow-hidden">
//           <img 
//             src={imageUrl} 
//             alt={title} 
//             className="w-full h-full object-cover rounded-xl transition-transform duration-300 transform hover:scale-110" 
//           />
//           <div className="absolute top-2 left-2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md">
//             Photo by {author}
//           </div>
//           <h3 className="absolute right-0 bottom-0 text-lg font-bold text-white">{title}</h3>
//         </div>
//         <div className="p-4 flex flex-col flex-grow">
//           <p className="mt-2 text-white flex-grow">{description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HighlightCard;