function PopupWithForm(props) {
  const saveButtonClassName = `popup__save-button ${props.isLoading ? 'popup__save-button_loading' : ''}`;

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <form className="popup__form" name={`${props.name}Form`} onSubmit={props.onSubmit}>
          <h2 className="popup__header">{props.title}</h2>

          {props.children}

          <button type="submit" className={saveButtonClassName}>
            {props.isLoading ? '' : props.submitText}
          </button>
        </form>

        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default PopupWithForm;
