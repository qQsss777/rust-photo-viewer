import MapView from "../MapView/MapView";
import "./Metadata.css";
interface IMetatadaProps {
  data: Record<string, unknown>;
  coordinates?: [number, number, number];
}

function Metadata(props: IMetatadaProps) {
  if (!props.data || Object.keys(props.data).length === 0) {
    return <div>Pas de métadonnée.</div>;
  }
  return (
    <div className="is-flex is-flex-direction-column is-flex-grow-1 column-optionnal-element">
      <div className="map-container">
        {props.coordinates && <MapView coordinates={props.coordinates} />}
      </div>
      <div className="metadata-container">
        <div class="metadata">
          {Object.keys(props.data).map((d) => {
            return (
              <div key={d}>
                {d} : {props.data[d]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Metadata;
