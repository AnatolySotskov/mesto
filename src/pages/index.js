import "./index.css";
import { Card } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  apiSettings,
  profileAvatar,
  popupAvatarEdit,
  buttonAvatarEdit,
} from "../utils/constants.js";
import PopupDelCard from "../components/PopupWithConfirmation.js";

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
const profileFormAvatar = document.querySelector(".popup__form-avatar"); // Форма добавления аватара

const api = new Api(apiSettings);

function createCard(cardData) {
  const cardItem = new Card(
    cardData,
    ".card-template",
    handleCardClick,
    userInfo.getUserInfo().userId,
    handleLikes,
    (cardId, card) => popupDelCardClass.open(cardId, card)
  );

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

Promise.all([api.getInfoUser(), api.getCards()]).then(([InfoUser, cards]) => {
  userInfo.setUserInfo(InfoUser);
  cardSection.rendererItems(cards);
});

//Вызов новых валидаций
const validatorEdit = new FormValidator(cardFormEdit, option);
validatorEdit.enableValidation();

const validatorAdd = new FormValidator(cardFormAdd, option);
validatorAdd.enableValidation();

const validatorAvatar = new FormValidator(profileFormAvatar, option);
validatorAvatar.enableValidation();

const popupThisImages = new PopupWithImage(".popup_type_image");
popupThisImages.setEventListeners();

const popupDelCardClass = new PopupDelCard(".popup_type_delete", cardsDelete);
popupDelCardClass.setEventListeners();

function cardsDelete(evt, { cardId, card }) {
  evt.preventDefault();
  api.deleteCards(cardId).then(() => {
    card.remove();
    popupDelCardClass.close();
  });
}

function handleCardClick(cardData) {
  popupThisImages.open(cardData);
}

const submitAddFormHandler = (evt, data) => {
  evt.preventDefault();
  popupAddCards.buttonRender(true);
  api
    .addCard(data)
    .then((data) => {
      cardSection.addItem(createCard(data));
      popupAddCards.close();
    })
    .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
    .finally(() => {
      popupAddCards.buttonRender(false, "Сохранить");
    });
};

const popupAddCards = new PopupWithForm(
  ".popup_type_add",
  submitAddFormHandler
);
popupAddCards.setEventListeners();

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

const submitUserFormHandler = (evt, data) => {
  evt.preventDefault();
  popupUser.buttonRender(true);
  api
    .patchProfile(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupUser.close();
    })
    .catch((err) => console.log(`Ошибка изменения данных пользователя: ${err}`))
    .finally(() => {
      popupUser.buttonRender(false, "Сохранить");
    });
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
  popupAvatarProfile.buttonRender(true);
  api
    .patchAvatar(avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatarProfile.close();
    })
    .catch((err) => console.log(`Ошибка изменения аватара: ${err}`))
    .finally(() => {
      popupAvatarProfile.buttonRender(false, "Сохранить");
    });
}

function handleLikes(card) {
  api.toggleLike(card.getInfo()).then((res) => card.updateLikes(res));
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
