import { TStatus } from "../../hooks/usePhoto";
import Metadata from "../Metatada/Metadata";
import "./MainContent.css";

export interface IPhotoData {
  image: string;
  metadata: Record<string, unknown>;
  coordinates?: [number, number, number];
}

interface IMainInterfaceProps {
  rawData: IPhotoData;
  status: TStatus;
}

function MainContent(props: IMainInterfaceProps) {
  const { status, rawData } = props;
  const { image, metadata, coordinates } = rawData;
  let currentMessage = "";
  if (status === "failed") {
    currentMessage = "Echec du chargement.";
  } else if (status === "in-progress") {
    currentMessage = "Chargement en cours.";
  } else if (status === "no-data") {
    currentMessage = "Ajoutez une photo.";
  }
  return (
    <section className="hero is-flex-grow-1 main-content">
      <div class="columns m-2 is-flex-grow-1 main-content">
        <div class="column is-two-thirds is-flex-grow-1 root-photo">
          {currentMessage ? (
            <div>{currentMessage}</div>
          ) : (
            <div className="photo-container">
              <img src={image} />
            </div>
          )}
        </div>
        <div class="column is-flex is-flex-direction-column is-one-third is-flex-grow-1 is-align-content-stretch">
          {currentMessage ? (
            <div>{currentMessage}</div>
          ) : (
            <Metadata data={metadata} coordinates={coordinates} />
          )}
        </div>
      </div>
    </section>
  );
}

export default MainContent;
