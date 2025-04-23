import { useEffect, useState } from "preact/hooks";
import TauriInterface from "../services/TauriInterface";
import { IPhotoData } from "../components/MainContent/MainContent";

export type TStatus = "succeed" | "failed" | "in-progress" | "no-data";

const initialState = {
  image: "",
  metadata: {},
};
export const usePhoto = (path: string) => {
  const [status, setStatus] = useState<TStatus>("no-data");
  const [rawData, setRawData] = useState<IPhotoData>(initialState);

  const resetData = () => {
    setStatus("no-data");
    setRawData(initialState);
  };

  useEffect(() => {
    if (!path) {
      setStatus("no-data");
      setRawData(initialState);
    } else {
      if (path) {
        setStatus("in-progress");
        TauriInterface.getInstance()
          .getPhoto(path)
          .then((rawData) => {
            const jsonData = JSON.parse(rawData);
            setRawData(jsonData);
            setStatus("succeed");
          })
          .catch(() => {
            setStatus("failed");
            setRawData(initialState);
          });
      }
    }
  }, [path]);
  return { status, rawData, resetData };
};
