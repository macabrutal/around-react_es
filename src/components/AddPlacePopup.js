import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup (props) {
    return (<>
        <PopupWithForm
            name={"addCard"}
            open={props.open}
            errors={props.errors}
            setErrors={props.setErrors}
            handleClose={props.handleClosePopup}
        >
            <div id="popupAddContainer">
                <form
                    id="formAdd"
                    onSubmit={props.handleSubmitAddCard}
                    action=""
                    className="popup"
                    name="add-place"
                    noValidate
                >
                    <h4 className="popup__title-popup">Nuevo lugar</h4>
                    <fieldset className="popup__fieldset">
                        <div className="popup__field">
                            <input
                                id="addTitle"
                                name="title"
                                className="popup__input-popup"
                                type="text"
                                placeholder="Título"
                                required
                                minLength="2"
                                maxLength="30"
                            />

                            <span className="popup__error popup__error_title">
                  {props.errors.addCard.title}
                </span>
                        </div>
                        <div className="popup__field">
                            <input
                                id="addImage"
                                name="image"
                                className="popup__input-popup"
                                type="url"
                                placeholder="Enlace a la imagen"
                                required
                            />

                            <span className="popup__error popup__error_image">
                  {props.errors.addCard.image}
                </span>
                        </div>
                        <button
                            disabled = {props.isInvalid('addCard')}
                            id="createButton"
                            type="submit"
                            className= {`popup__button-popup ${props.isInvalid('addCard') ? 'popup__button-popup_inactive' : '' }`}>
                            Crear
                        </button>
                    </fieldset>
                </form>
            </div>
        </PopupWithForm>
    </>)
}