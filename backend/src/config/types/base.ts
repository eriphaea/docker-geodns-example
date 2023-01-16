export default class Base {
  constructor(config) {
    for (const i of Object.keys(config)) {
      this[i] = config[i];
    }
  }
}
