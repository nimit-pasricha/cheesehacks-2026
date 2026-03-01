import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useMemo, useState } from "react";
import type { GeoLocation, PT_classname } from "../types";

function PickMarker({ onSelect }: { onSelect?: (loc: GeoLocation) => void }) {
  const [position, setPosition] = useState<GeoLocation | null>(null);

  useMapEvents({
    click(e) {
      const loc: GeoLocation = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };
      setPosition(loc);
      if (onSelect !== undefined) onSelect(loc);
    },
  });

  return position ? (
    <Marker
      position={{
        lat: position.latitude,
        lng: position.longitude,
      }}
    />
  ) : null;
}

export function LocationPicker(props: {
  height?: string;
  onSelect?: (loc: GeoLocation) => void;
}) {
  const center = useMemo(() => [0, 0], []);
  return (
    <MapContainer
      center={[center[0], center[1]]}
      zoom={1}
      style={{ height: props.height ?? "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PickMarker onSelect={props.onSelect} />
    </MapContainer>
  );
}

export function LocationDisplay(
  props: { location: GeoLocation; zoom?: number } & PT_classname,
) {
  const center = useMemo(
    () => [props.location.latitude, props.location.longitude],
    [props.location],
  );
  return (
    <MapContainer
      center={[center[0], center[1]]}
      zoom={props.zoom ?? 13}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={{
          lat: center[0],
          lng: center[1],
        }}
      />
    </MapContainer>
  );
}
