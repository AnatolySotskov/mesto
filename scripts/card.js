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

  //Паблик метод содания карточки
  createCard() {
    this._card = this._getTemplate();
    this._cardPhoto = this._card.querySelector(".card__photo");
    this._cardTitle = this._card.querySelector(".card__title");
    this._cardLike = this._card.querySelector(".card__like");
    this._cardTrashButton = this._card.querySelector(".card__delete-button");

    this._cardPhoto.src = this._cardData.link;
    this._cardTitle.textContent = this._cardData.name;
    this._cardPhoto.alt = this._cardData.name;
    this._setEventListeners();

    return this._card;
  }

  _handleRemoveCard() {
    this._card.remove();
  }

  _handleLikeClick() {
    this._cardLike.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", () =>
      this._handleOpenPopup(this._cardData)
    );

    this._cardTrashButton.addEventListener("click", () =>
      this._handleRemoveCard()
    );

    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick();
    });
  }
}
