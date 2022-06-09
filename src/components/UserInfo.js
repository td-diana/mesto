export default class UserInfo {
  constructor(nameSelector, aboutNameSelector) {
    this._profileName = document.querySelector(nameSelector);
    this._aboutName = document.querySelector(aboutNameSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      aboutname: this._aboutName.textContent,
    };
  }

  setUserInfo({ name, aboutname }) {
    this._profileName.textContent = name;
    this._aboutName.textContent = aboutname;
  }
}
