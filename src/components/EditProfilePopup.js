import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../context/CurrentUserContext.js'

export default function EditProfilePopup({isOpened, onClose, onUpdateUser}) {

  const [name, setName] = useState('') 
  const [description, setDescription] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    })
  } 

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpened]); 

	return (
    <PopupWithForm 
      name = 'edit-profile'
      title = 'Редактировать профиль'
      submitButtonText = 'Сохранить'
      isOpened = {isOpened}
      onClose = {onClose}
      onSubmit= {handleSubmit}
    >
      <fieldset className="edit-form__set">
        <label className="edit-form__field">
          <input type="text" name="name" value={name} onChange={ handleChangeName } className="edit-form__input-text edit-form__input-text_type_name" placeholder="Имя" required minLength="2" maxLength="40" id="name-input" />
          <span className="edit-form__input-error name-input-error"></span>
        </label>
        <label className="edit-form__field">
          <input type="text" name="about" value={description} onChange={ handleChangeDescription } className="edit-form__input-text edit-form__input-text_type_activity" placeholder="Деятельность" required minLength="2" maxLength="200" id="activity-input" />
          <span className="edit-form__input-error activity-input-error"></span>
        </label>
      </fieldset>    
    </PopupWithForm>
	)
}