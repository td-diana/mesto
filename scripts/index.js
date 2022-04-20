let popupEdit = document.querySelector('.popup_edit');
let profileButtonEdit = document.querySelector('.profile__button-edit');
let popupCloseBtn = document.querySelectorAll('.popup__button-close');

let popupForm = document.querySelector('.popup__form');
let popupFieldName = popupForm.querySelector('.popup__field-name');
let popupFieldAboutName = popupForm.querySelector('.popup__field-about-name');
let profileName = document.querySelector('.profile__name');
let profileAboutName = document.querySelector('.profile__about-name');

function popupOpen(popupObject) {
    popupObject.classList.add('popup_opened');
}

function popupClose(popupObject){
    popupObject.classList.remove(`popup_opened`);
}

function popupFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAboutName.textContent = popupFieldAboutName.value;
    popupClose(popupEdit);
}

profileButtonEdit.addEventListener('click', function (){
    popupOpen(popupEdit);
});

popupCloseBtn.forEach(function (arrElement){
    arrElement.addEventListener('click',  function(){
        popupClose(this.closest('.popup'));
    });
});

popupForm.addEventListener('submit', popupFormSubmitHandler);
