


//Класс Card
 export class Card {
  constructor(cardData, cardTemplate, handleOpenPopup) {
    this._cardTemplate = cardTemplate;
    this._cardData = cardData;
    this._handleOpenPopup = handleOpenPopup;
  }

  //Шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // //Метод открытия попапа  просмотра картинки


  // //Метод для  лайка
  // _setLike () {
  //   this.classList.toggle("card__button-like_active");
  // }

  // //Метод удаления карточки
  // _deleteCard () {
  //   this._card.remove();
  //   this._card = null;
  // }

  //Подключаем слушатели
  

  //Паблик метод содания карточки
  createCard() {
    this._card = this._getTemplate();
    this._cardPhoto = this._card.querySelector(".card__photo");
    this._cardTitle = this._card.querySelector(".card__title");

    this._cardPhoto.src = this._cardData.link;
    this._cardTitle.textContent = this._cardData.name;
    this._cardPhoto.alt = this._cardData.name;
    this._setEventListeners();

    return this._card;
  }
  _setEventListeners() {
    this._card
      .querySelector(".card__photo")
      .addEventListener("click", () => this._handleOpenPopup(this._cardData));
    
    this._card
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._card.remove());

    this._card.querySelector(".card__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("card__like_active");
    });
  }
}

