function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <div className="popup__tooltip_wrapper">
          <img
            className="popup__tooltip_image"
            alt={props.img}
            src={props.img}
          />
          <title className="popup__tooltip-title">{props.title}</title>
        </div>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;
