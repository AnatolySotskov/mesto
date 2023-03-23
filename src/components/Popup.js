export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_visible")) {
        this.close(this._popup);
      }
      this._popup
        .querySelector(".popup__button-close")
        .addEventListener("click", () => {
          this.close();
        });
    });
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };
}
