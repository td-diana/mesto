import { openPopup } from '../pages/index.js';

const popupImages = document.querySelector(".popup_img");
const popupImage = popupImages.querySelector('.popup__images');
const popupTitleImg = popupImages.querySelector(".popup__title-img");

 //окно картики (картинка, описание картинки, подпись к картинке)
 function openPopupImg({ name, link }) {
    popupImage.src = link;
    popupImage.alt = name;
    popupTitleImg.textContent = name;

    openPopup(popupImages);
  }

  export { openPopupImg };