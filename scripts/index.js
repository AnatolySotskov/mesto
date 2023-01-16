let popup = document.querySelector('.popup'); //Окно попапа
let buttonEdit = document.querySelector('.profile__edit-button'); //Кнопка редактирования
let buttonClose = document.querySelector('.popup__button-close'); //Кнопка закрытия 
let popupForm = document.querySelector('.popup__form'); // Попап форма
let nameProfile = document.querySelector('.profile__title'); //Имя профиля
let statusProfile = document.querySelector('.profile__subtitle'); // Статус профиля
let inputNameProfile = document.querySelector('.popup__input_name_profile-name'); //Имя профиля в попапа
let inputStatusProfile = document.querySelector('.popup__input_name_profile-description'); // Статус профиля


// Функция открытия окна     
function popupVisible() {
    popup.classList.add('popup_visible'); 
    inputNameProfile.value = nameProfile.textContent;
    inputStatusProfile.value = statusProfile.textContent;
}


// Функция закрытия окна     
function popupClose() {
    popup.classList.remove('popup_visible'); 
}


// Функция самбита на форме
function handleFormSubmit (evt) {
    evt.preventDefault();
    nameProfile.textContent = inputNameProfile.value;
    statusProfile.textContent = inputStatusProfile.value;
    popupClose();
}





buttonEdit.addEventListener('click', popupVisible);  // Слушателеь кнопки ред окна   
buttonClose.addEventListener('click', popupClose);  // Слушателеь кнопки закрытия окна   
popupForm.addEventListener('submit', handleFormSubmit); // слушатель самбита на форме



