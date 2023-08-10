import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import React from 'react'

function App() {
  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false)
  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false)
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false)
  const [selectedCard, handleCardClick] = React.useState('')
  
  function closeAllPopups() {
    onEditProfile(false)
    onAddPlace(false)
    onEditAvatar(false)
    handleCardClick('')
  }

  return (
  <>
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {onEditProfile}
        onAddPlace = {onAddPlace}
        onEditAvatar = {onEditAvatar}
        onCardClick = {handleCardClick}
      />
      <Footer />
    </div>

    <PopupWithForm 
      name = {'edit-profile'}
      title = {'Редактировать профиль'}
      submitButtonText = {'Сохранить'}
      isOpened = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
    >
          <fieldset className="edit-form__set">
            <label className="edit-form__field">
              <input type="text" name="name" className="edit-form__input-text edit-form__input-text_type_name" placeholder="Имя" value="" required minlength="2" maxlength="40" id="name-input" />
              <span className="edit-form__input-error name-input-error"></span>
            </label>
            <label className="edit-form__field">
              <input type="text" name="about" className="edit-form__input-text edit-form__input-text_type_activity" placeholder="Деятельность" value="" required minlength="2" maxlength="200" id="activity-input" />
              <span className="edit-form__input-error activity-input-error"></span>
            </label>
          </fieldset>    
    </PopupWithForm>

    <PopupWithForm 
      name = {'edit-avata'}
      title = {'Обновить аватар'}
      submitButtonText = {'Сохранить'}
      isOpened = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
    >
          <fieldset className="edit-form__set">
            <label className="edit-form__field">
              <input type="url" name="avatar" className="edit-form__input-text edit-form__input-text_type_link" placeholder="Cсылка на аватарку" value="" required id="avatar-link-input" />
              <span className="edit-form__input-error avatar-link-input-error"></span>
            </label>
          </fieldset>
    </PopupWithForm>

    <PopupWithForm 
      name = {'add-photo'}
      title = {'Новое место'}
      submitButtonText = {'Сохранить'}
      isOpened = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
    >
          <fieldset className="edit-form__set">
            <label className="edit-form__field">
              <input type="text" name="name" className="edit-form__input-text edit-form__input-text_type_title" placeholder="Название" value="" required minlength="2" maxlength="30" id="title-input" />
              <span className="edit-form__input-error title-input-error"></span>
            </label>
            <label className="edit-form__field">
              <input type="url" name="link" className="edit-form__input-text edit-form__input-text_type_link" placeholder="Cсылка на картинку" value="" required id="link-input" />
              <span className="edit-form__input-error link-input-error"></span>
            </label>
          </fieldset>
    </PopupWithForm>
    
  {/* 
    <div className="popup" id="delete-photo">
      <div className="popup__container popup__container_edit-form">
        <button className="popup__close" type="button" aria-label="Закрыть"></button>
        <form className="edit-form" name="delete-photo" novalidate>
          <h2 className="edit-form__title">Вы уверены?</h2>
          <fieldset className="edit-form__set">
            <button className="edit-form__button edit-form__button_type_save" type="submit" aria-label="Да">Да</button>
          </fieldset>
        </form>
      </div>
    </div> */}

    {/* <div className="popup popup_overlay_show-card" id="show">
      <div className="popup__container popup__container_card-details">
        <button className="popup__close" type="button" aria-label="Закрыть"></button>
        <article className="card-details">
          <img className="card-details__image" src="./" alt="" />
          <h4 className="card-details__title"></h4>
        </article>
      </div>
    </div> */}

    <ImagePopup
      card = {selectedCard}
      onClose = {closeAllPopups}
    />
  </>
  );
}

export default App;
