import { openPopupImg } from '../scripts/utils.js';

export default class Card {
  /*
  _popupImages = document.querySelector(".popup_img");
  _popupImage = this._popupImages.querySelector('.popup__images');
  _popupTitleImg = this._popupImages.querySelector(".popup__title-img");
*/
  constructor(cardData, cardSelector) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
  }

  /*
  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__element")
      .cloneNode(true);
  }
  */

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

      return cardElement;
  }

/*
лучше заранее поместить кнопку лайка в отдельное поле класса this._buttonLike 
(например, в методе generateCard) и переключать класс у this._buttonLike. 
Ведь вы используете элемент кнопки лайка еще и для установки слушателя.
Там тоже пригодится this._buttonLike
  _likeButton() {
    this._element
      .querySelector(".elements__icon-like")
      .classList.toggle("elements__icon-like_mod_active");      
  }
*/

_likeButton() {  
  this._buttonLike.classList.toggle("elements__icon-like_mod_active");
}
 
  _removeButton() {
    this._element.remove();
    this._element = null;
  }

  /*
  //окно картики (картинка, описание картинки, подпись к картинке)
  _openPopupImg({ name, link }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitleImg.textContent = name;

    openPopup(this._popupImages);
  }
  */

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
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
        openPopupImg(this._cardData);
      });
  }

  generateCard() {        
    this._element = this._getTemplate();
    const elementImage = this._element.querySelector(".elements__img");
    elementImage.src = this._cardData.link;
    elementImage.alt = this._cardData.name;
    this._buttonLike = this._element.querySelector('.elements__icon-like');

    this._element.querySelector(".elements__title").textContent =
      this._cardData.name;
    this._setEventListeners();
    return this._element;
  }
}