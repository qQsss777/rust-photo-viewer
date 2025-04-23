import { useEffect, useState } from "preact/hooks";
import TauriInterface from "../services/TauriInterface";
import { IPhotoData } from "../components/MainContent/MainContent";

export type TStatus = "succeed" | "failed" | "in-progress" | "no-data";
interface IusePhotos extends IPhotoData {
  status: TStatus;
}

const initialState: IusePhotos = {
  image: "",
  metadata: {},
  status: "no-data",
};

export const usePhoto = (path: string) => {
  const [rawData, setRawData] = useState<IusePhotos>(initialState);

  const resetData = () => {
    setRawData(initialState);
  };

  useEffect(() => {
    if (!path) {
      setRawData(initialState);
    } else {
      if (path) {
        setRawData({ ...rawData, status: "in-progress" });
        TauriInterface.getInstance()
          .getPhoto(path)
          .then((rawData) => {
            const jsonData = JSON.parse(rawData);
            setRawData({ ...jsonData, status: "succedd" });
          })
          .catch(() => {
            setRawData({ ...rawData, status: "failed" });
          });
      }
    }
  }, [path]);
  return { rawData, resetData };
};
