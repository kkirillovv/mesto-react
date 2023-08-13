export default function Card({card, onCardClick}) {

	function handledClick() {
		onCardClick(card)
	}

  return (
		<article className="element">
			<img className="element__photo" src={card.link} alt={card.name} onClick={handledClick} />
			{(card.userId === card.owner._id) ? <button className="element__trash" type="button"></button> : ""}
			<div className="element__block">
				<h3 className="element__title">{card.name}</h3>
				<div>
					<button className="element__like" type="button"></button>
					<p className="element__like-counter">{card.counterLikes}</p>
				</div>
			</div>
		</article>
  )
}