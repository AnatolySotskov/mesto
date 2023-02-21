// ПЕРЕМЕННЫЕ ДЛЯ ПОПАПА РЕДАКТИРОВАНИЕ ПРОФИЛЯ //
const popupEdit = document.querySelector(".popup_type_edit") 
const buttonEdit = document.querySelector(".profile__edit-button"); //Кнопка редактирования
const profileForm = document.querySelector(".popup__form"); // Попап форма
const nameProfile = document.querySelector(".profile__title"); //Имя профиля
const statusProfile = document.querySelector(".profile__subtitle"); // Статус профиля
const inputNameProfile = document.querySelector(".popup__input_name_profile-name"); //Имя профиля в попапа
const inputStatusProfile = document.querySelector(".popup__input_name_profile-description"); // Статус профиля

 //Кнопка закрытия попапов
 const closeButtons = document.querySelectorAll(".popup__button-close");

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
const openPopupImage = document.querySelector(".popup_type_image"); // Открытие картинки попапа
const popupImage = document.querySelector(".popup__image"); // Картинка попапа
const popupTitleImage = document.querySelector(".popup__title_type_image"); //заголовок фото

//Переменная оверлеев для отслеживания
const popUps = Array.from(document.querySelectorAll('.popup'));


//Функция закрытия попАпов на Escape
function popUpEscClose(e) { 
    if (e.key === "Escape") { 
      const visiblePopUps = document.querySelector('.popup_visible');
      closePopup(visiblePopUps)
    }}


// Функция открытия окн
function openPopup(popup) {
    popup.classList.add("popup_visible");
    document.addEventListener('keydown', popUpEscClose)
}

// Функция закрытия окна
function closePopup(popupName) {
    document.addEventListener('keydown', popUpEscClose)
    popupName.classList.remove("popup_visible");
    
}

//Функция закртия попАпов по оверлею
popUps.forEach(popup =>  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')){
        closePopup(popup);
    }
  }))

  
// Функция самбита на форме
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = inputNameProfile.value;
    statusProfile.textContent = inputStatusProfile.value;
    closePopup(popupEdit);
}


// Функция самбита добавление карточки
function handleFormSubmitAdd (evt) {
    evt.preventDefault();
    cards.prepend(createCard(inputCardName.value, inputCardLink.value));
    closePopup(popupAdd);
    cardFormAdd.reset();
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
        openPopup(openPopupImage)
    })

    return card
}



initialCards.forEach(cardData =>{
    const card = createCard(cardData.name, cardData.link)
    cards.append(card)
})


// Слушателеь кнопки закрытия окон
closeButtons.forEach((button) => {
    button.addEventListener("click", function(event){
        closePopup(event.target.closest(".popup"))
    });
});

// Слушателеь кнопки добавления фото
buttonAddPhoto.addEventListener("click", () => {
    openPopup(popupAdd)
}); 

// Слушателеь кнопки открытия редарования профиля
buttonEdit.addEventListener("click", () => {
    inputNameProfile.value = nameProfile.textContent;
    inputStatusProfile.value = statusProfile.textContent;
    openPopup(popupEdit)
}); 



  
profileForm.addEventListener("submit", handleProfileFormSubmit); // слушатель самбита на форме редактирование профиля
cardFormAdd.addEventListener("submit", handleFormSubmitAdd); // слушатель самбита на форме карточки


