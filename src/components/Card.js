export default class Card {
  constructor(
    { data, handleCardClick, handleLikeCard, handleCardDelete },
    cardTemplateSelector,
    api,
    userId
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._api = api;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  // Класс Card должен описывать только DOM логику элемента карточки. Всю серверную логику следует выполнять в файле index.js.
  // То есть при создании экземпляра класса Card, мы описываем его колбэки-запросы на сервере, в блоке then которых как раз-таки
  //  следует вызывать соответствующие DOM методы класса Card.
  // DOM функционал лайка/дизлайка карточки следует вынести в отдельный метод класса (по аналогии с методом удаления removeButton)
  //  и вызывать его в блоке then соответствующего api запроса лайка/дизлайка в файле index.js

  // handleLikeCard() {
  //   const likeButton = this._element.querySelector(".elements__icon-like");
  //   const likeCount = this._element.querySelector(".elements__like-counter");

  //   if (!likeButton.classList.contains("elements__icon-like_mod_active")) {
  //     this._api
  //       .like(this._id)
  //       .then((data) => {
  //         likeButton.classList.add("elements__icon-like_mod_active");
  //         likeCount.textContent = data.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     this._api
  //       .dislike(this._id)
  //       .then((data) => {
  //         likeButton.classList.remove("elements__icon-like_mod_active");
  //         likeCount.textContent = data.likes.length;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  updateData(newData) {
    this._likes = newData.likes;
  }

  handleLikeButton() {
    this._likeCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("elements__icon-like_mod_active");
    } else {
      this._likeButton.classList.remove("elements__icon-like_mod_active");
    }
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleCardDelete();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, src: this._link });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".elements__img");    

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;
    this._buttonDelete = this._element.querySelector(".elements__icon-delete");
    this._likeButton = this._element.querySelector(".elements__icon-like"); 
    this._likeCount = this._element.querySelector(".elements__like-counter");
    this._likeCount.textContent = this._likes.length;

    if (!(this._ownerId === this._userId)) {
      this._element.querySelector(".elements__icon-delete").style.display =
        "none";
    }
    if (this._likes.find((obj) => this._userId === obj._id)) {
      this._element
        .querySelector(".elements__icon-like")
        .classList.add("elements__icon-like_mod_active");
    }

    this._setEventListeners();

    return this._element;
  }
}
