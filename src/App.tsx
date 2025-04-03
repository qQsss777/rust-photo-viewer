import { useState } from "preact/hooks";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import MapView from "./components/MapView/MapView";
import Header from "./components/Header/Header";
import Metadata from "./components/Metatada/Metadata";
import MainContent from "./components/MainContent/MainContent";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="hero is-flex-direction-column is-fullheight is-justify-content-flex-start">
      <Header />
      <MainContent />
    </div>
  );
}

export default App;
