import React from 'react'
import api from '../utils/Api.js'
import Card from './Card.js'

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState(false)
  const [userDescription, setUserDescription] = React.useState(false)
  const [userAvatar, setUserAvatar] = React.useState(false)
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getPageData()
      .then(([user, initialCards]) => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)

        initialCards.forEach((item) => {
          item.userId = user._id
          item.counterLikes = item.likes.length 
        })
        setCards(initialCards)
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }, [])

  // function handleEditAvatarClick() {
  //   document.querySelector('#edit-avatar').classList.add('popup_opened')
  // }
  
  // function handleEditProfileClick() {
  //   document.querySelector('#edit-profile').classList.add('popup_opened')
  // }

  // function handleAddPlaceClick() {
  //   document.querySelector('#add-photo').classList.add('popup_opened')
  // }

    return (
        <main className="content">
        <section className="profile">
          <button className="profile__avatar" type="button" onClick={() => {onEditAvatar(true)}} style={{ backgroundImage: `url(${userAvatar})` }}></button>
          <div className="profile-info">
            <h1 className="profile-info__name">{userName}</h1>
            <button className="profile-info__edit" type="button" aria-label="Редактировать"  onClick={() => {onEditProfile(true)}}></button>
            <p className="profile-info__activity">{userDescription}</p>
          </div>
          <button className="profile__add-photo" type="button" aria-label="Добавить фото" onClick={() => {onAddPlace(true)}}></button>
        </section>
       
        <section className="elements" aria-label="Фотогалерея">
          {cards.map((card, i) => {
            return(<Card
              card = {card}
              onCardClick = {onCardClick}
              key={card._id}
            />)
          })}
        </section>
      </main>
    )
}