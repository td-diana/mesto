export default class UserInfo {
  constructor(userSelectors) {
    this._profileIName = document.querySelector(userSelectors.name);
    this._profileInfo = document.querySelector(userSelectors.info);
    this._profileAvatar = document.querySelector(userSelectors.avatar);
  }

  getUserInfo() {
    return {
      name: this._profileIName.textContent,
      info: this._profileInfo.textContent,
    };
  }

  setUserInfo(data) {
    this._profileIName.textContent = data.name;
    this._profileInfo.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
