import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import DeletePlaceConfirmPopup from './DeletePlaceConfirmPopup.js'
import ImagePopup from './ImagePopup.js'
import React from 'react'
import api from '../utils/Api.js'
import {CurrentUserContext} from '../context/CurrentUserContext.js'
import {CardsContext} from '../context/CardsContext.js'

function App() {
  // стейты попапов
  const [isEditProfilePopupOpen, onEditProfile] = React.useState(false)
  const [isAddPlacePopupOpen, onAddPlace] = React.useState(false)
  const [isEditAvatarPopupOpen, onEditAvatar] = React.useState(false)
  const [isDeletePlaceConfirmPopupOpen, onDeletePlace] = React.useState(false)
  const [selectedCard, handleCardClick] = React.useState({name: '', link: ''})

  // стейт текущего пользователя
  const [currentUser, getUserInfo] = React.useState({})

  // стейты карточек
  const [cards, getCardsData] = React.useState([])
  const [deleteCard, handleCardDelete] = React.useState({_id: ''})

  React.useEffect(() => {
    api.getPageData()
      .then(([user, initialCards]) => {
        getUserInfo(user)
        initialCards.forEach((item) => {
          item.userId = user._id
          item.counterLikes = item.likes.length 
        })
        getCardsData(initialCards)
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }, [])

  function closeAllPopups () {
    onEditProfile(false)
    onAddPlace(false)
    onEditAvatar(false)
    onDeletePlace(false)
    handleCardClick({name: '', link: ''})
    handleCardDelete({_id: ''})
  }

  function handleCardLike (card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    console.log(isLiked)
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLike(card._id, !isLiked)
      .then((newCard) => {
        getCardsData((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
  }

  function handleUpdateUser (newUserData) {
    api.editUserInfo(newUserData)
      .then((user) => {
        getUserInfo(user)
        closeAllPopups()
      })
  }

  function handleUpdateAvatar (newAvatar) {
    console.log(newAvatar)
    api.editUserAvatar(newAvatar)
      .then((user) => {
        getUserInfo(user)
        closeAllPopups()
      })
  }

  function handleAddPlace (card) {
    api.addNewCard(card)
      .then((newCard) => {
        getCardsData([newCard, ...cards])
        closeAllPopups()
      }
      )
  }

  function handleDeletePlace (card) {
    console.log(card)
    api.deleteCard(card)
    .then((res) => {
      getCardsData((cards) => cards.filter((item) => item._id !== card))
      closeAllPopups()
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main 
            onEditProfile = {onEditProfile}
            onAddPlace = {onAddPlace}
            onEditAvatar = {onEditAvatar}
            cards = {cards}            
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike} 
            onDeleteClick = {onDeletePlace}
            setCardDelete = {handleCardDelete}            
          />
          <Footer />
        </div>

        <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />
        <AddPlacePopup isOpened = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace={handleAddPlace} />
        <DeletePlaceConfirmPopup isOpened = {isDeletePlaceConfirmPopupOpen} onClose = {closeAllPopups} onDelete={handleDeletePlace} cardId = {deleteCard} /> 
        <ImagePopup card = {selectedCard} onClose = {closeAllPopups} />

      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App