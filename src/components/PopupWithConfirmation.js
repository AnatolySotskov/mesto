import Popup from './Popup.js';

export default class PopupDelCard extends Popup {
  constructor (popup, submitDelete) {
    super(popup);
    this._submit = submitDelete;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  _onSubmitHandler = (e) => {
    this._submit(e, { cardId: this._cardId, card: this._card })
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._onSubmitHandler);
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}