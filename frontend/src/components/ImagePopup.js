function ImagePopup(props) {
  return (
    <div className={`popup popup_blacked ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__image-container">
        <img
          className="popup__image"
          alt={props.card?.name}
          src={props.card?.link}
        />
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <title className="popup__image-title">{props.card?.name}</title>
      </div>
    </div>
  )
}

export default ImagePopup;
