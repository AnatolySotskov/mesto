import "./index.css"
import { Card } from "../components/Card.js";
import { initialCards } from "../components/cardsData.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Настройки конструктора валидции
const option = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА РЕДАКТИРОВАНИЕ ПРОФИЛЯ //
const popupEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button"); //Кнопка редактирования
const profileForm = document.querySelector(".popup__form"); // Попап форма
const nameProfile = document.querySelector(".profile__title"); //Имя профиля
const statusProfile = document.querySelector(".profile__subtitle"); // Статус профиля
const inputNameProfile = document.querySelector(
  ".popup__input_name_profile-name"
); //Имя профиля в попапа
const inputStatusProfile = document.querySelector(
  ".popup__input_name_profile-description"
);
const cardFormEdit = document.querySelector(".popup__form_type_edit"); // Форма добавления карточки

//Кнопка закрытия попапов
const closeButtons = document.querySelectorAll(".popup__button-close");

// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ДОБАВЛЕНИЯ ФОТО В ПРОФИЛЬ //
const popupAdd = document.querySelector(".popup_type_add"); //окно добавления фото
const buttonAddPhoto = document.querySelector(".profile__add-button"); //Кнопка добавления фото
const inputCardName = document.querySelector(".popup__input_name_photo-name"); // Инпут фото карты
const inputCardLink = document.querySelector(".popup__input_name_url-photo"); // Инпут ссылки для карточки фото
const cardFormAdd = document.querySelector(".popup__form_type_add"); // Форма добавления карточки

// ПЕРЕМЕННЫЕ ДЛЯ  КАРТОЧЕК
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card"); //Шаблон  карточек
const cards = document.querySelector(".cards"); // расположение карточек

// // ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ОТКРЫТИЕ ФОТО
const openPopupImage = document.querySelector(".popup_type_image"); // Открытие картинки попапа
const popupImage = document.querySelector(".popup__image"); // Картинка попапа
const popupTitleImage = document.querySelector(".popup__title_type_image"); //заголовок фото

//Переменная оверлеев для отслеживания
const popUps = Array.from(document.querySelectorAll(".popup"));

function createCard(cardData) {
  const cardItem = new Card(cardData, ".card-template", handleCardClick);
  return cardItem.createCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cards.append(createCard(item));
    }
  }, ".cards");
cardSection.rendererItems();

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
  )
};

const popupAddCards = new PopupWithForm(
  ".popup_type_add",
  submitAddFormHandler
);
popupAddCards.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__subtitle");


const submitUserFormHandler = (data) => {
  userInfo.setUserInfo(data)
}

const popupUser = new PopupWithForm(
  ".popup_type_edit",
  submitUserFormHandler
);
popupUser.setEventListeners();


// Слушателеь кнопки добавления фото
buttonAddPhoto.addEventListener("click", () => {
  popupAddCards.open();
});

// Слушателеь кнопки открытия редарования профиля
buttonEdit.addEventListener("click", () => {
  popupUser.setInputValue(userInfo.getUserInfo())
  popupUser.open();
});

