import { open } from "@tauri-apps/plugin-dialog";
import MainContent from "./components/MainContent/MainContent";
import ButtonsSection from "./components/ButtonsSection/ButtonsSection";
import { useState } from "preact/hooks";
import { usePhoto } from "./hooks/usePhoto";
import "./App.css";
import { warn } from "@tauri-apps/plugin-log";

function App() {
  const [path, setPath] = useState("");
  const { status, rawData } = usePhoto(path);

  /**
   * Get photo callback
   */
  async function loadPhoto() {
    const file = await open({
      multiple: false,
      directory: false,
    });
    if (file) {
      setPath(file);
    }
  }

  return (
    <div className="app-root hero is-flex-direction-column is-fullheight is-justify-content-flex-start">
      <ButtonsSection onLoadPhoto={loadPhoto} />
      <MainContent rawData={rawData} status={status} />
    </div>
  );
}

export default App;
