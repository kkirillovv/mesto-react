import React from 'react'

export default function PopupWithForm ({name, title, submitButtonText, children, isOpened, onClose}) {
	return (
		<div className={isOpened ? `popup popup_opened` : `popup`} id={`${name}`}>  
			<div className="popup__container popup__container_edit-form">
				<button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
				<form className="edit-form" name={`${name}`}>
					<h2 className="edit-form__title">{`${title}`}</h2>
					{children}
        	<button className="edit-form__button edit-form__button_type_save" type="submit" aria-label={`${submitButtonText}`}>{`${submitButtonText}`}</button>
				</form>
			</div>
		</div>
	)
}