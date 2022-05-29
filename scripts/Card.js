export default class Card {
  _popupImages = document.querySelector(".popup__images");
  _popupTitleImg = document.querySelector(".popup__title-img");
  _popupImg = document.querySelector(".popup_img");
  constructor(cardData, cardSelector) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }

  _likeButton() {
    this._element
      .querySelector(".elements__icon-like")
      .classList.toggle("elements__icon-like_mod_active");
  }
  _removeButton() {
    this._element.remove();
  }

  //окно картики (картинка, описание картинки, подпись к картинке)
  _openPopupImg({ name, link }) {
    this._popupImages.src = link;
    this._popupImages.alt = name;
    this._popupTitleImg.textContent = name;

    openPopup(this._popupImg);
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__icon-like")
      .addEventListener("click", () => {
        this._likeButton();
      });

    this._element
      .querySelector(".elements__icon-delete")
      .addEventListener("click", () => {
        this._removeButton();
      });

    this._element
      .querySelector(".elements__img")
      .addEventListener("click", () => {
        this._openPopupImg(this._cardData);
      });
  }

  generateCard() {
    this._getTemplate();
    const elementImage = this._element.querySelector(".elements__img");
    elementImage.src = this._cardData.link;
    elementImage.alt = this._cardData.name;
    this._element.querySelector(".elements__title").textContent =
      this._cardData.name;
    this._setEventListeners();
    return this._element;
  }
}
