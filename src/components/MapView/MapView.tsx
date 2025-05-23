import * as L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { useEffect } from "preact/hooks";
import "./MapView.css";

interface IMapViewProps {
  coordinates: [number, number, number];
}
function MapView(props: IMapViewProps) {
  useEffect(() => {
    const center = new L.LatLng(props.coordinates[1], props.coordinates[0]);
    const map = L.map("map").setView(center, 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    const icon = new L.Icon({ iconUrl: markerIconPng });
    L.marker(center, { icon }).addTo(map);
  }, [props.coordinates]);
  if (props.coordinates) {
    return <div id="map" className="map-view"></div>;
  } else {
    return <div>Pas de coordonnées GPS</div>;
  }
}

export default MapView;
