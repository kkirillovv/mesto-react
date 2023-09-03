import React from 'react'
import PopupWithForm from './PopupWithForm.js'

export default function AddPlacePopup({isOpened, onClose, onAddPlace}) {

  const name = React.useRef()
  const link = React.useRef()

  React.useEffect(() => {
    name.current.value = ''
    link.current.value = ''
  }, [isOpened])

  function handleSubmit (e) {
    e.preventDefault()
    onAddPlace({ 
      name: name.current.value, 
      link: link.current.value,
    })
  }

  return (
    <PopupWithForm 
    name = {'add-photo'}
    title = {'Новое место'}
    submitButtonText = {'Сохранить'}
    isOpened = {isOpened}
    onClose = {onClose}
    onSubmit= {handleSubmit}
  >
        <fieldset className="edit-form__set">
          <label className="edit-form__field">
            <input type="text" name="name" ref={name} className="edit-form__input-text edit-form__input-text_type_title" placeholder="Название" required minLength="2" maxLength="30" id="title-input" />
            <span className="edit-form__input-error title-input-error"></span>
          </label>
          <label className="edit-form__field">
            <input type="url" name="link" ref={link} className="edit-form__input-text edit-form__input-text_type_link" placeholder="Cсылка на картинку" required id="link-input" />
            <span className="edit-form__input-error link-input-error"></span>
          </label>
        </fieldset>
  </PopupWithForm>
  )
}