// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА РЕДАКТИРОВАНИЕ ПРОФИЛЯ //
const popup = document.querySelector(".popup"); //Окно попапа редактирование профиля
const buttonEdit = document.querySelector(".profile__edit-button"); //Кнопка редактирования
const buttonClose = document.querySelectorAll(".popup__button-close"); //Кнопка закрытия
const popupForm = document.querySelector(".popup__form"); // Попап форма
const nameProfile = document.querySelector(".profile__title"); //Имя профиля
const statusProfile = document.querySelector(".profile__subtitle"); // Статус профиля
const inputNameProfile = document.querySelector(".popup__input_name_profile-name"); //Имя профиля в попапа
const inputStatusProfile = document.querySelector(".popup__input_name_profile-description"); // Статус профиля

// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ДОБАВЛЕНИЯ ФОТО В ПРОФИЛЬ //
const popupAdd = document.querySelector(".popup_add"); //окно добавления фото
const buttonAddPhoto = document.querySelector(".profile__add-button"); //Кнопка добавления фото

// ПЕРЕМЕННЫЕ ДЛЯ ШАБЛОНА КАРТОЧЕК
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cards = document.querySelector(".cards");



// Функция открытия окна для добавления фото
function popupVisibleAddPhoto() {
    popupAdd.classList.add("popup_visible");
}

// Функция открытия окна для редактирования профиля
function popupVisible() {
    popup.classList.add("popup_visible");
    inputNameProfile.value = nameProfile.textContent;
    inputStatusProfile.value = statusProfile.textContent;
}

// Функция закрытия окна
function popupClose(event) {
    const popup = event.target.closest(".popup");
    popup.classList.remove("popup_visible");
}

// Функция самбита на форме
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = inputNameProfile.value;
    statusProfile.textContent = inputStatusProfile.value;
    popupClose();
}

function createCard(name,link) {
    const card = cardTemplate.cloneNode(true);
    const cardPhoto = card.querySelector(".card__photo");
    const cardTitle = card.querySelector(".card__title");

    cardPhoto.src = link
    cardTitle.textContent = name

    return card
}



initialCards.forEach(cardData =>{
    const card = createCard(cardData.name, cardData.link)
    cards.append(card)
})


// Слушателеь кнопки закрытия окон
buttonClose.forEach((button) => {
    button.addEventListener("click", popupClose);
});

buttonAddPhoto.addEventListener("click", popupVisibleAddPhoto); // Слушателеь кнопки добавления фото
buttonEdit.addEventListener("click", popupVisible); // Слушателеь кнопки открытия редарования профиля
popupForm.addEventListener("submit", handleFormSubmit); // слушатель самбита на форме редактирование профиля
