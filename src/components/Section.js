export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(items) {
    this._container.prepend(this._renderer(items));
  }

  rendererItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }
}
