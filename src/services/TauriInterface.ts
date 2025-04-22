import { invoke } from "@tauri-apps/api/core";

export default class TauriInterface {
  static instance: TauriInterface;
  private constructor() {}

  static getInstance(): TauriInterface {
    if (!this.instance) {
      this.instance = new TauriInterface();
    }
    return TauriInterface.instance;
  }

  async getPhoto(path: string): Promise<string> {
    const rawData = (await invoke("open_photo", { path: path })) as string;
    return rawData;
  }
}
