import React, { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm.js'

export default function EditAvatarPopup({isOpened, onClose, onUpdateUser}) {

  const avatar = useRef()

  // обнулим инпут при открытии попапа
  useEffect(() => {
    avatar.current.value = ''
  }, [isOpened])

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({ avatar: avatar.current.value })
  } 

  return (
    <PopupWithForm 
    name = 'edit-avata'
    title = 'Обновить аватар'
    submitButtonText = 'Сохранить'
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit= {handleSubmit}
    >
      <fieldset className="edit-form__set">
        <label className="edit-form__field">
          <input type="url" name="avatar" ref={avatar} className="edit-form__input-text edit-form__input-text_type_link" placeholder="Cсылка на аватарку" required id="avatar-link-input" />
          <span className="edit-form__input-error avatar-link-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}