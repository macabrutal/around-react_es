import React from "react";

import "../index.css";

import Header from "./Header";
import Footer from "./Footer";
import api from "../utils/api";
import ImagePopup from "./ImagePopup"; //Antes: PopupWithImage
import PopupWithForm from "./PopupWithForm";
import Main from "./Main";
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";

export default function App(props) {

  const [cards, setCards] = React.useState([]); //estado0 de usuarios

  const [openPopup, setOpenPopup] = React.useState("");

  const [selectedCard, setSelectedCard] = React.useState(""); //para saber qué card está seleccionada

  const [errors, setErrors] = React.useState({
    profile: {},
    addCard: {},
    avatar: {},
  });

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((json) => {
        setCards(json);
      })
      .catch((error) => {});
  }, []);

  

  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((json) => {
        setCurrentUser(json);
      })
      .catch((error) => {});
  }, []);

  //sprint 11 :Ref
  const imageRef = React.useRef();

  //SRINT 11: handle like de la card
  function handleLikeCard(cardId) {
    const card = cards.find((item) => {
      return item._id === cardId;
    });

    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}

  // 3 HANDLE PARA CARD
  function handleClickImage(cardId) {
    setOpenPopup("popupImage");
    const card = cards.find((item) => {
      return item._id === cardId;
    });
    setSelectedCard(card);
  }


  function handleDeleteCard(cardId) {
    setOpenPopup("confirmation");
    const card = cards.find((item) => {
      return item._id === cardId;
    });
    setSelectedCard(card);
  }

  // 3 HANDLE PARA UserInfo
  function handleEditAvatar(event) {
    setOpenPopup("avatar");
  }

  function handleEditProfile(event) {
    setOpenPopup("profile");
  }

  function handleClickAdd(event) {
    setOpenPopup("addCard");
  }

  function handleClosePopup(event) {
    setOpenPopup("");
  }

  // envía el form de EDIT PROFILE y lo cierra:
  function handleSubmitProfile(event) {
    event.preventDefault();
    api
      .editProfile(
        event.target.elements["name"].value,
        event.target.elements["about"].value
      )
      .then((json) => {
        setCurrentUser(json);
        handleClosePopup();
      });
    event.target.reset(); //resetear los inputs
  }

  function handleSubmitAvatar(event) {
    event.preventDefault();
    const linkValue = imageRef.current.value;
    api.newAvatar(linkValue).then((json) => {
      setCurrentUser(json);
      handleClosePopup();
    });
    event.target.reset(); //resetear los inputs
  }


  // envía el form de ADD CARD y lo cierra:
  function handleSubmitAddCard(event) {
    event.preventDefault();

    const titleValue = event.target.elements["title"].value;
    const imageValue = event.target.elements["image"].value;
    api.addNewCard(titleValue, imageValue).then((data) => {
      setCards([data, ...cards])
      handleClosePopup();
    });
    event.target.reset(); //resetear los inputs
  }

  // envía el form Confirmation y lo cierra:
  function handleSubmitConfirmation(event) {
    event.preventDefault();
    api.deleteCard(selectedCard._id).finally(() => {
      setOpenPopup("");
      api
        .getInitialCards()
        .then((json) => {
          setCards(json);
        })
        .catch((error) => {});
    }); //borra la card seleccionada
  }

  //sprint 11: botoón inválido
  function isInvalid(form){
    if(!errors[form]) return false;
    return Object.keys(errors[form]).some(item => {
      return errors[form][item] !== '';
    })
  }

  return (
    <div className="page">
      <Header />

      <CurrentUserContext.Provider value={currentUser}>
      <Main
        cards={cards}
        // onCardLike={handleCardLike}
        handelOpenPopup={() => {
          setOpenPopup("profile");
        }}
        handleEditAvatar={handleEditAvatar} //profile__avatar-edit
        handleEditProfile={handleEditProfile} //profile__edit-button
        handleClickAdd={handleClickAdd}
        handleClickImage={handleClickImage}
        handleLikeCard={handleLikeCard}
        handleDeleteCard={handleDeleteCard}
      />
  </CurrentUserContext.Provider>

      <Footer />

      {/* CONFIRMATION (DELETE) */}
      <PopupWithForm
        name={"confirmation"}
        open={openPopup === "confirmation"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
      >
        <div id="popupDelete">
          <form
            id="formDelete"
            onSubmit={handleSubmitConfirmation}
            action=""
            className="popup popup_question"
            name="delete-card"
            noValidate
          >
            <h4 className="popup__title-popup">¿Estás seguro?</h4>
            <input
              type="hidden"
              name="card_id"
              className="popup__input-popup popup__hidden"
            />
            <fieldset className="popup__fieldset">
              <button
                id="saveDelete"
                type="submit"
                className="popup__button-popup"
              >
                Si
              </button>
            </fieldset>
          </form>
        </div>
      </PopupWithForm>

      {/* EDIT PROFILE*/}
      <EditProfilePopup
        name={"profile"}
        open={openPopup === "profile"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
        isInvalid={isInvalid}
        handleSubmitProfile={handleSubmitProfile}
      >
        <div id="profilePopup">
          <form
            id="form"
            onSubmit={handleSubmitProfile}
            action=""
            className="popup"
            name="edit-profile"
            noValidate
          >
            <h4 className="popup__title-popup">Edit profile</h4>
            <fieldset className="popup__fieldset">
              <div className="popup__field">
                <input
                  id="profileTitle"
                  className={`popup__input-popup ${
                    errors.profile.name ? "popup__input-popup_error" : ""
                  }`}
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  required
                  minLength="2"
                  maxLength="40"
                />
                <span className="popup__error popup__error_name">
                  {errors.profile.name}
                </span>
              </div>

              <div className="popup__field">
                <input
                  id="profileSubtitle"
                  className="popup__input-popup"
                  type="text"
                  placeholder="Acerca de mí"
                  name="about"
                  required
                  minLength="2"
                  maxLength="200"
                />
                <span className="popup__error popup__error_about">
                  {errors.profile.about}
                </span>
              </div>
              <button 
              disabled = {isInvalid('profile')}
              id="save" type="submit" 
              className= {`popup__button-popup ${isInvalid('profile') ? 'popup__button-popup_inactive' : '' }`}>
                Guardar
              </button>
            </fieldset>
          </form>
        </div>
      </EditProfilePopup>

      {/* AVATAR */}
      <EditAvatarPopup
        name={"avatar"}
        open={openPopup === "avatar"}
        errors={errors}
        setErrors={setErrors}
        handleClose={handleClosePopup}
        isInvalid={isInvalid}
        handleSubmitAvatar={handleSubmitAvatar}
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
                  {errors.avatar.avatar}
                </span>
              </div>
              <button
              disabled = {isInvalid('avatar')}
                id="saveAvatar"
                type="submit"
              className= {`popup__button-popup ${isInvalid('avatar') ? 'popup__button-popup_inactive' : '' }`}>
                Guardar
              </button>
            </fieldset>
          </form>
        </div>
      </EditAvatarPopup>

      {/* ADD CARD */}
      <AddPlacePopup
        name={"addCard"}
        open={openPopup === "addCard"}
        errors={errors}
        setErrors={setErrors}
        handleClosePopup={handleClosePopup}
        handleSubmitAddCard={handleSubmitAddCard}
        isInvalid={isInvalid}
      />

      {/* IMAGE POPUP */}
      <ImagePopup
        name={"popupImage"}
        open={openPopup === "popupImage"}
        selectedCard={selectedCard}
        handleClose={handleClosePopup}
      />
    </div>
  );
}
