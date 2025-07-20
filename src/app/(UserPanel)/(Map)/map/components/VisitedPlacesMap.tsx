"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ensure marker icons appear correctly in Next.js/Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export interface Place {
  pageId: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  image: string;
}

interface VisitedPlacesMapProps {
  places: Place[];
}

const VisitedPlacesMap: React.FC<VisitedPlacesMapProps> = ({ places }) => {
  if (!places || places.length === 0) return <div>No places to display.</div>;

  // Fallback center if any place data is missing coords
  const center: [number, number] = [
    places[0].location?.latitude ?? 20,
    places[0].location?.longitude ?? 80,
  ];

  return (
    <MapContainer
      center={center}
      zoom={8}
      scrollWheelZoom
      style={{ height: 400, width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) =>
        place.location &&
        typeof place.location.latitude === "number" &&
        typeof place.location.longitude === "number" ? (
          <Marker
            key={place.pageId}
            position={[place.location.latitude, place.location.longitude]}
          >
            <Popup>
              <div>
                <strong>{place.location.address}</strong>
                <br />
                {place.image && (
                  <img
                    src={place.image}
                    alt={place.location.address}
                    style={{ maxWidth: "140px", maxHeight: "80px", marginTop: "6px", borderRadius: "0.3em" }}
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
};

export default VisitedPlacesMap;
