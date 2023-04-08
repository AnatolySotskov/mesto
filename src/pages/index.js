import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { apiSettings, profileAvatar, popupAvatarEdit, buttonAvatarEdit } from "../utils/constants.js";

//Настройки конструктора валидции
const option = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const buttonEdit = document.querySelector(".profile__edit-button"); //Кнопка редактирования
const cardFormEdit = document.querySelector(".popup__form_type_edit"); // Форма добавления карточки
const buttonAddPhoto = document.querySelector(".profile__add-button"); //Кнопка добавления фото
const cardFormAdd = document.querySelector(".popup__form_type_add"); // Форма добавления карточки


const api = new Api(apiSettings);

function createCard(cardData) {
  const cardItem = new Card(cardData, ".card-template", handleCardClick);
  return cardItem.createCard();
}

const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createCard(item));
    },
  },
  ".cards"
);

api.getCards().then((items) => {
  cardSection.rendererItems(items)
})

api.getInfoUser().then((data) => {
  userInfo.setUserInfo(data);
})

console.log(api.getInfoUser())

//Вызов новых валидаций
const validatorEdit = new FormValidator(cardFormEdit, option);
validatorEdit.enableValidation();

const validatorAdd = new FormValidator(cardFormAdd, option);
validatorAdd.enableValidation();

const popupThisImages = new PopupWithImage(".popup_type_image");
popupThisImages.setEventListeners();

function handleCardClick(cardData) {
  popupThisImages.open(cardData);
}

const submitAddFormHandler = (data) => {
  cardSection.addItem(
    createCard({
      name: data.nameMesto,
      link: data.urlMesto,
    })
  );
};

const popupAddCards = new PopupWithForm(
  ".popup_type_add",
  submitAddFormHandler
);
popupAddCards.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");

const submitUserFormHandler = (data) => {
  userInfo.setUserInfo(data);
};

const popupUser = new PopupWithForm(".popup_type_edit", submitUserFormHandler);
popupUser.setEventListeners();

//попап изменения аватара
const popupAvatarProfile = new PopupWithForm(
  ".popup_type_avatar",
  submitAvatarFormHandler
);
popupAvatarProfile.setEventListeners();

//функция на сабмит формы смены аватара
function submitAvatarFormHandler(evt, { avatar }) {
  evt.preventDefault();
  popupAvatarProfile.loadingButton(true);
  api
    .patchAvatar(avatar)
    .then((data) => {
      userinfo.setUserInfo(data);
      popupAvatarProfile.close();
    })
    .catch((err) => console.log(`Ошибка изменения аватара: ${err}`))
    .finally(() => {
      popupAvatarProfile.loadingButton(false);
    });
}




//слушатель на аватарке
buttonAvatarEdit.addEventListener("click", () => {
  popupAvatarProfile.open();
});

// Слушателеь кнопки добавления фото
buttonAddPhoto.addEventListener("click", () => {
  popupAddCards.open();
});

// Слушателеь кнопки открытия редарования профиля
buttonEdit.addEventListener("click", () => {
  popupUser.setInputValue(userInfo.getUserInfo());
  popupUser.open();
});
