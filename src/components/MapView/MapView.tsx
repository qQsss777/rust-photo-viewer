import * as L from "leaflet";
import { useEffect } from "preact/hooks";
import "./MapView.css";
import { warn } from "@tauri-apps/plugin-log";

interface IMapViewProps {
  coordinates: [number, number, number];
}
function MapView(props: IMapViewProps) {
  useEffect(() => {
    warn(JSON.stringify(props.coordinates));
    const center = new L.LatLng(props.coordinates[1], props.coordinates[0]);
    const map = L.map("map").setView(center, 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    L.marker(center).addTo(map);
  }, [props.coordinates]);
  if (props.coordinates) {
    return <div id="map" className="map-view"></div>;
  } else {
    return <div>Pas de coordonnées GPS</div>;
  }
}

export default MapView;
