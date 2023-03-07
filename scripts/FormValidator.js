export default class FormValidator {
  constructor(formElement, option) {
    this._inputSelector = option.inputSelector;
    this._submitButtonSelector = option.submitButtonSelector;
    this._errorClass = option.errorClass;
    this._inputErrorClass = option.inputErrorClass;
    this._inactiveButtonClass = option.inactiveButtonClass;

    this._formElement = formElement;
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState();
    this._formElement.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  enableValidation = () => {
    this._setEventListeners();
  };
}
