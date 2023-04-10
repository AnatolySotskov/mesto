import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._popup.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector('.popup__button-save');
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  close() {
    this._form.reset();
    super.close();
  }


  _submitHandler = (evt) => {
    this._submitForm(evt, this._getInputValues())
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._submitHandler)
    // (event) => {
      // event.preventDefault();
      // this._submitForm(this._getInputValues());
      // this.close();
    // });
    super.setEventListeners();
  }

  setInputValue(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }


  buttonRender(loading, text="Сохранение...") {
    this._submitButton.disabled = loading;
    this._submitButton.textContent = text;
  }
}
