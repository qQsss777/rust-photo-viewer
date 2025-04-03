export default class TauriInterface {
  static instance: TauriInterface;
  private constructor() {}

  static getIntance(): TauriInterface {
    if (!this.instance) {
      this.instance = new TauriInterface();
    }
    return TauriInterface.instance;
  }

  getPhoto() {}
}
