const showInputError = (formElement, inputElement, errorMessage, option) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(option.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(option.errorClass);
};

const hideInputError = (formElement, inputElement, option) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(option.inputErrorClass);
  errorElement.classList.remove(option.errorClass);
  errorElement.textContent = "";
};

const setEventListeners = (formElement, option) => {
  const inputs = Array.from(formElement.querySelectorAll(option.inputSelector));
  const buttonElement = formElement.querySelector(option.submitButtonSelector);
  const checkInputValidity = (formElement, inputElement, option) => {
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        option
      );
    } else {
      hideInputError(formElement, inputElement, option);
    }
  };
  toggleButtonState(inputs, buttonElement, option);
  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputs, buttonElement, option);
    }, 0);
  });
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, option);
      toggleButtonState(inputs, buttonElement, option);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, option) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(option.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(option.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const enableValidation = (option) => {
  const formList = Array.from(document.querySelectorAll(option.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, option);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
});
