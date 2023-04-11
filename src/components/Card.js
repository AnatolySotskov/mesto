//Класс Card
export class Card {
  constructor(
    cardData,
    cardTemplate,
    handleCardClick,
    userId,
    handleLikes,
    popupDelOpen
  ) {
    this._cardTemplate = cardTemplate;
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
    this._likesCount = cardData.likes.length;
    this._isLike = cardData.likes.some((like) => like._id === userId);
    this._cardId = cardData._id;
    this._handleLikes = handleLikes;
    this._userOwner = cardData.owner._id === userId;
    this._popupDelOpen = popupDelOpen;
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
    this._likeCount = this._card.querySelector(".card__like-count");
    this._likeCount.textContent = this._likesCount;
    this._cardPhoto.src = this._cardData.link;
    this._cardTitle.textContent = this._cardData.name;
    this._cardPhoto.alt = this._cardData.name;
    if (this._isLike === true) {
      this._cardLike.classList.add("card__like_active");
    }
    this._setEventListeners();

    return this._card;
  }

  updateLikes(data) {
    if (this._isLike === true) {
      this._cardLike.classList.remove("card__like_active");
      this._likeCount.textContent = data.likes.length;
      this._isLike = false;
    } else {
      this._cardLike.classList.add("card__like_active");
      this._likeCount.textContent = data.likes.length;
      this._isLike = true;
    }
  }

  getInfo() {
    return { cardId: this._cardId, isLike: this._isLike };
  }

  _handleRemoveCard = () => {
    this._popupDelOpen(this._cardId, this._card);
  };

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", () =>
      this._handleCardClick(this._cardData)
    );

    if (this._userOwner) {
      this._cardTrashButton.addEventListener("click", this._handleRemoveCard);
    } else {
      this._cardTrashButton.remove();
    }
    +this._cardLike.addEventListener("click", () => {
      this._handleLikes(this);
    });
  }
}
