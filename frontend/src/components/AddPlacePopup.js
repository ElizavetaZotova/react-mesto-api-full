import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);


  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
      submitText="Создать"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="placeName"
        type="text"
        className="popup__input"
        id="placeNameInput"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error placeNameInput-error"></span>

      <input
        name="placeImageLink"
        type="url"
        className="popup__input"
        id="placeImageLinkInput"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error placeImageLinkInput-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
