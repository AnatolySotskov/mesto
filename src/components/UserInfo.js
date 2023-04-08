export default class UserInfo {
  constructor(nameSelector, titleSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = '';
  }

  getUserInfo() {
    return {
      nameProfile: this._name.textContent,
      textProfile: this._title.textContent,
      userId: this._userId,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._title.textContent = about;
    this._avatar.src = avatar;
    this._userId = _id;
  }
}
