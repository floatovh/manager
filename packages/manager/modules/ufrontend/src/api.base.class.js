class OvhMicroFrontendBaseAPI {
  constructor(ufrontend) {
    this.ufrontend = ufrontend;
  }

  listen(callback) {
    return this.ufrontend.addListener(callback);
  }

  emit() {
    throw new Error(`Unimplemented method OvhMicroFrontendBaseAPI.emit`, this);
  }
}

export default OvhMicroFrontendBaseAPI;
