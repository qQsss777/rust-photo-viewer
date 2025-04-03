import MapView from "../MapView/MapView";
import Metadata from "../Metatada/Metadata";
import "./MainContent.css";

function MainContent() {
  return (
    <section className="hero is-flex-grow-1">
      <div class="columns m-2 is-flex-grow-1">
        <div class="column is-two-thirds is-flex-grow-1"></div>
        <div class="column is-flex is-one-third is-flex-grow-1 is-align-content-stretch">
          <div className="is-flex is-flex-direction-column is-flex-grow-1 column-optionnal-element">
            <div className="map-container content-element-container">
              <MapView />
            </div>
            <div className="metadata-container content-element-container">
              <Metadata />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainContent;
