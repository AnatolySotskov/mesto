export default class UserInfo {
  constructor(nameSelector, titleSelector) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
  }

  getUserInfo() {
    return {
      nameProfile: this._name.textContent,
      textProfile: this._title.textContent,
    };
  }

  setUserInfo({ nameProfile, textProfile }) {
    this._name.textContent = nameProfile;
    this._title.textContent = textProfile;
  }
}
