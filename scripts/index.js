// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА РЕДАКТИРОВАНИЕ ПРОФИЛЯ //
const popup = document.querySelector(".popup"); //Окно попапа редактирование профиля
const popupEdit = document.querySelector(".popup_type_edit") 
const buttonEdit = document.querySelector(".profile__edit-button"); //Кнопка редактирования
const popupForm = document.querySelector(".popup__form"); // Попап форма
const nameProfile = document.querySelector(".profile__title"); //Имя профиля
const statusProfile = document.querySelector(".profile__subtitle"); // Статус профиля
const inputNameProfile = document.querySelector(".popup__input_name_profile-name"); //Имя профиля в попапа
const inputStatusProfile = document.querySelector(".popup__input_name_profile-description"); // Статус профиля

 //Кнопка закрытия попапов
 const buttonClose = document.querySelectorAll(".popup__button-close");

// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ДОБАВЛЕНИЯ ФОТО В ПРОФИЛЬ //
const popupAdd = document.querySelector(".popup_type_add"); //окно добавления фото
const buttonAddPhoto = document.querySelector(".profile__add-button"); //Кнопка добавления фото
const inputCardName = document.querySelector(".popup__input_name_photo-name"); // Инпут фото карты
const inputCardLink = document.querySelector(".popup__input_name_url-photo"); // Инпут ссылки для карточки фото 
const cardFormAdd = document.querySelector(".popup__form_type_add"); // Форма добавления карточки

// ПЕРЕМЕННЫЕ ДЛЯ  КАРТОЧЕК
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card"); //Шаблон  карточек
const cards = document.querySelector(".cards"); // расположение карточек

// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА ОТКРЫТИЕ ФОТО
const popupOpenImage = document.querySelector(".popup_type_image"); // Открытие картинки попапа
const popupImage = document.querySelector(".popup__image"); // Картинка попапа
const popupTitleImage = document.querySelector(".popup__title_type_image"); //заголовок фото



// Функция открытия окн
function popupOpen(popup) {
    popup.classList.add("popup_visible");
}


// Функция закрытия окна
function popupClose(popupName) {
    popupName.classList.remove("popup_visible");
}

// Функция самбита на форме
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = inputNameProfile.value;
    statusProfile.textContent = inputStatusProfile.value;
    popupClose(popupEdit);
}


// Функция самбита добавление карточки
function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    cards.prepend(createCard(inputCardName.value, inputCardLink.value));
    popupClose(popupAdd);
}

//  СОЗДАНИЕ КАРТОЧЕК / Лайка / удаление карточки
function createCard(name,link) {
    const card = cardTemplate.cloneNode(true);
    const cardPhoto = card.querySelector(".card__photo");
    const cardTitle = card.querySelector(".card__title");
    const buttonLikeCard = card.querySelector(".card__like");
    const trashButton = card.querySelector(".card__delete-button");

    cardPhoto.src = link
    cardTitle.textContent = name
    cardPhoto.alt = name
    buttonLikeCard.addEventListener("click", () => {
        buttonLikeCard.classList.toggle("card__like_active");
    })
    trashButton.addEventListener("click", () => {
        card.remove();
    })

    cardPhoto.addEventListener("click", () => {
        popupTitleImage.textContent = name
        popupImage.src = link
        popupImage.alt = name
        popupOpen(popupOpenImage)
    })

    return card
}



initialCards.forEach(cardData =>{
    const card = createCard(cardData.name, cardData.link)
    cards.append(card)
})


// Слушателеь кнопки закрытия окон
buttonClose.forEach((button) => {
    button.addEventListener("click", function(event){
        popupClose(event.target.closest(".popup"))
    });
});

// Слушателеь кнопки добавления фото
buttonAddPhoto.addEventListener("click", () => {
    popupOpen(popupAdd)
}); 

// Слушателеь кнопки открытия редарования профиля
buttonEdit.addEventListener("click", () => {
    inputNameProfile.value = nameProfile.textContent;
    inputStatusProfile.value = statusProfile.textContent;
    popupOpen(popupEdit)
}); 

popupForm.addEventListener("submit", handleFormSubmit); // слушатель самбита на форме редактирование профиля
cardFormAdd.addEventListener("submit", handleFormSubmitAdd); // слушатель самбита на форме карточки