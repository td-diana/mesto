import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__images");
    this._popupTitleImg = this._popup.querySelector(".popup__title-img");
  }

  open({ link, name }) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitleImg.textContent = name;
  }
}