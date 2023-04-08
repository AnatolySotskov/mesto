export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(items) {
    this._container.prepend(items);
  }

  rendererItems(items) {
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }
}
