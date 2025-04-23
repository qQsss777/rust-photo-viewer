import { open } from "@tauri-apps/plugin-dialog";
import MainContent from "./components/MainContent/MainContent";
import ButtonsSection from "./components/ButtonsSection/ButtonsSection";
import { useState } from "preact/hooks";
import { usePhoto } from "./hooks/usePhoto";
import "./App.css";

function App() {
  const [path, setPath] = useState("");
  const { rawData, resetData } = usePhoto(path);
  /**
   * Get photo callback
   */
  async function loadPhoto() {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "Image",
          extensions: ["jpg", "jpeg", "png"],
        },
      ],
    });
    if (file) {
      resetData();
      setPath(file);
    }
  }
  return (
    <div className="app-root hero is-flex-direction-column is-fullheight is-justify-content-flex-start">
      <ButtonsSection onLoadPhoto={loadPhoto} />
      <MainContent rawData={rawData} status={rawData.status} />
    </div>
  );
}

export default App;
