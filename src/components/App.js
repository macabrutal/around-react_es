// FALTA TERMINAR:
// handleClickImage(event)
// handleLikeCard(event)
// handleDeleteCard(event)
//handleEditAvatar(event)
//handleEditProfile(event)
//handleClickAdd(event)


import React from "react";

import api from './Api'
import logo from '../images/logo.png';
import Card from './Card';
import Main from './Main';
import UserInfo from './UserInfo';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';


export default function App(){

React.useEffect(() => {
  api.getInitialCards().then(json => {
    setCards(json);  
  })
  .catch((error) => {
    console.log(error);
  }); 
}, []);

React.useEffect(() => {
  api.getProfileInfo().then(json => {
    setUser(json);  
  })
  .catch((error) => {
    console.log(error);
  }); 
}, []);



const [user, setUser] = React.useState({});      //estado0 de usuarios
const [cards, setCards] = React.useState([]);   //estado0 de usuarios

const [popups, setPopups] = React.useState({
popupImage: false,
popupProfile: false,
popupAddCard: false,
popupAvatar: false,
popupConfirmation: false
})    //estado de los 5 POPUPS

const [selectedCard, setSelectedCard] = React.useState({});
const [errors, setErrors]= React.useState();

// 3 HANDLE PARA CARD
function handleClickImage(event){

}

function handleLikeCard(event){

}

function handleDeleteCard(event){

}

// 3 HANDLE PARA UserInfo 
function handleEditAvatar(event){

}

function handleEditProfile(event){

}

function handleClickAdd(event){

}


  return (
    <div className="page">
       <header className="header">
      <img className="header__logo" src={logo} alt="logo" />

      <hr className="header__line" />
    </header>

      <Main> 
        <UserInfo user={user}
        handleEditAvatar={handleEditAvatar}     //profile__avatar-edit
        handleEditProfile={handleEditProfile}   //profile__edit-button
        handleClickAdd={handleClickAdd}        //profile__add-button 
        />


        <div className="cards">
          {cards.map(item => <Card
          user={user}
          cardId={item._id}
          title={item.title}
          link={item.link}
          likes={item.likes}
          owner={item.owner}
          handleClickImage={handleClickImage}
          handleLikeCard={handleLikeCard}
          handleDeleteCard={handleDeleteCard}
          key={item._id}
          />)}
        </div>
      </Main>
      
      <footer className="footer">
      <p className="footer__text-footer">© 2021 Alrededor de los EEUU</p>
    </footer>



{/* CONFIRMATION (DELETE) */}
    <PopupWithForm>
    open={popups.popupConfirmation}
    handleClose={() => {setPopups({...popups, popupConfirmation: false })}}

    <div id="popupDelete" className="popup-container">
        <button id="closeDelete" className="popup-container__close-popup"></button>
        <form id="formDelete" action="" className="popup popup_question" name="delete-card" noValidate>
          <h4 className="popup__title-popup">¿Estás seguro?</h4>
          <input type="hidden" name="card_id" className="popup__input-popup popup__hidden"/>
          <fieldset className="popup__fieldset">
            <button id="saveDelete" type="submit" className="popup__button-popup">
              Si
            </button>
          </fieldset>
        </form>
      </div>
    </PopupWithForm>
    
{/* EDIT PROFILE*/}
    <PopupWithForm>
    open={popups.popupProfile}
    error={errors.profile}
    setErrors={() => {}}
    handleClose={() => {setPopups({...popups, popupProfile: false })}}

    <div id="profilePopup" className="popup-container">
      <button id="close" className="popup-container__close-popup"></button>
      <form id="form" action="" className="popup" name="edit-profile" noValidate>
        <h4 className="popup__title-popup">Edit profile</h4>
        <fieldset className="popup__fieldset">
          <div className="popup__field">
            <input id="profileTitle" className={`popup__input-popup ${errors.profile.name ? 'popup__error':''}`} type="text" placeholder="Nombre" name="name" required
              minLength="2" maxLength="40" />
            <span className="popup__error popup__error_name">{errors.profile.name}</span>
          </div>

          <div className="popup__field">
            <input id="profileSubtitle" className="popup__input-popup" type="text" placeholder="Acerca de mí" name="about"
              required minLength="2" maxLength="200" />
            <span className="popup__error popup__error_about"></span>
          </div>
          <button id="save" type="submit" className="popup__button-popup">
            Guardar
          </button>
        </fieldset>
      </form>
    </div>
    </PopupWithForm>


    {/* AVATAR */}
    <PopupWithForm>
    open={popups.popupAvatar}
    handleClose={() => {setPopups({...popups, popupAvatar: false })}}

    <div id="popupAvatar" className="popup-container">
        <button id="closeAvatar" className="popup-container__close-popup"></button>
        <form id="formAvatar" action="" className="popup popup_avatar" name="edit-avatar" noValidate>
          <h4 className="popup__title-popup">Cambiar foto de perfil</h4>
          <fieldset className="popup__fieldset">
            <div className="popup__field">
              <input id="profileAvatar" className="popup__input-popup" type="url" placeholder="Enlace a tu avatar" name="avatar"
                required   />
              <span className="popup__error popup__error_avatar"></span>
            </div>
            <button id="saveAvatar" type="submit" className="popup__button-popup">
              Guardar
            </button>
          </fieldset>
        </form>
      </div>
    </PopupWithForm>

{/* ADD CARD */}
    <PopupWithForm>
    open={popups.popupAddCard}
    handleClose={() => {setPopups({...popups, popupAddCard: false })}}

    <div id="popupAddContainer" className="popup-container">
      <button id="closeAddPopup" className="popup-container__close-popup"></button>
      <form id="formAdd" action="" className="popup" name="add-place" novalidate>
        <h4 className="popup__title-popup">Nuevo lugar</h4>
        <fieldset className="popup__fieldset">
          <div className="popup__field">
            <input id="addTitle" name="title" className="popup__input-popup" type="text" placeholder="Título" required
              minLength="2" maxLength="30" />
           
            <span className="popup__error popup__error_title"></span>
          </div>
          <div className="popup__field">
            <input id="addImage" name="image" className="popup__input-popup" type="url" placeholder="Enlace a la imagen"
              required />
            
            <span className="popup__error popup__error_image"></span>
          </div>
          <button id="createButton" type="submit" className="popup__button-popup">
            Crear
          </button>
        </fieldset>
      </form>
    </div>
    </PopupWithForm>

  <PopupWithImage
  open={popups.popupImage}
  selectedCard={selectedCard}
  handleClose={() => {setPopups({...popups, popupImage: false })}}/>

    </div>
  );
}


