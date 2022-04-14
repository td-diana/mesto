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


const popupForm = document.querySelector('.popup__form');
const popupFieldName = popupForm.querySelector('.popup__field-name');
const popupFieldAboutName = popupForm.querySelector('.popup__field-about-name');
const profileName = document.querySelector('.profile__name');
const profileAboutName = document.querySelector('.profile__about-name');

function popupFormSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = popupFieldName.value;
    profileAboutName.textContent = popupFieldAboutName.value;
    popupClose(popupEdit);
}

popupForm.addEventListener('submit', popupFormSubmitHandler);
