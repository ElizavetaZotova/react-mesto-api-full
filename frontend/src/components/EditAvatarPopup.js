import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={props.isOpen}
      isLoading={props.isLoading}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="avatarImageLink"
        type="url"
        className="popup__input"
        id="avatarImageLinkInput"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error avatarImageLinkInput-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
