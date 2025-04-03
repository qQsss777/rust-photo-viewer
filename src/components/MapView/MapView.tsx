import * as L from "leaflet";
import { useEffect } from "preact/hooks";
import "./MapView.css";

function MapView() {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }, []);
  return <div id="map" className="map-view"></div>;
}

export default MapView;
