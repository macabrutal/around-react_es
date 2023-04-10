import React from "react";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";

export default function EditAvatarPopup (props) {

    const imageRef = React.useRef();

    function handleSubmitAvatar(event) {
        event.preventDefault();
        const linkValue = imageRef.current.value;
        api.newAvatar(linkValue).then((json) => {
          props.setCurrentUser(json);
          handleClosePopup();
        });
        event.target.reset(); //resetear los inputs
      }

      function handleClosePopup() {
        props.handleClose();
      }
      
    return (<>
        <PopupWithForm
            name={"avatar"}
            open={props.open}
            errors={props.errors}
            setErrors={props.setErrors}
            handleClose={props.handleClosePopup}
        >
            
            <div id="popupAvatar">
                <form
                    id="formAvatar"
                    onSubmit={handleSubmitAvatar}
                    action=""
                    className="popup popup_avatar"
                    name="edit-avatar"
                    noValidate
                >
                    <h4 className="popup__title-popup">Cambiar foto de perfil</h4>
                    <fieldset className="popup__fieldset">
                        <div className="popup__field">
                            <input
                                id="profileAvatar"
                                className="popup__input-popup"
                                type="url"
                                placeholder="Enlace a tu avatar"
                                name="avatar"
                                ref={imageRef} //sprint 11 :Ref
                                required
                            />
                            <span className="popup__error popup__error_avatar">
                  {props.errors.avatar.avatar}
                </span>
                        </div>
                        <button
                            disabled = {props.isInvalid('avatar')}
                            id="saveAvatar"
                            type="submit"
                            className= {`popup__button-popup ${props.isInvalid('avatar') ? 'popup__button-popup_inactive' : '' }`}>
                            Guardar
                        </button>
                    </fieldset>
                </form>
            </div>
        </PopupWithForm>
    </>)
}