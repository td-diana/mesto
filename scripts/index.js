let popupEdit = document.querySelector('.popup_edit');
let profileButtonEdit = document.querySelector('.profile__button-edit');
let popupCloseBtn = document.querySelectorAll('.popup__button-close');

function popupOpen(popupObject) {
    popupObject.classList.add('popup_opened');
}

profileButtonEdit.addEventListener('click', function (){
    popupOpen(popupEdit);
});

function popupClose(popupObject){
    popupObject.classList.remove(`popup_opened`);
}

popupCloseBtn.forEach(function (arrElement){
    arrElement.addEventListener('click',  function(){
        popupClose(this.closest('.popup'));
    });
});


let popupForm = document.querySelector('.popup__form');
let popupFieldName = popupForm.querySelector('.popup__field-name');
let popupFieldAboutName = popupForm.querySelector('.popup__field-about-name');
let profileName = document.querySelector('.profile__name');
let profileAboutName = document.querySelector('.profile__about-name');

function popupFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAboutName.textContent = popupFieldAboutName.value;
    popupClose(popupEdit);
}

popupForm.addEventListener('submit', popupFormSubmitHandler);
