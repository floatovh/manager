export function emit(data, opts) {
  return window.ovhMicroFrontend.emitMessage(data, opts);
}

export function listen(callback) {
  return window.ovhMicroFrontend.addListener(callback);
}

export default {
  emit,
  listen,
};
