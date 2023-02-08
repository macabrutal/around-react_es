import React from "react";

import '../pages/index.css'

import Header from'./Header';
import Footer from './Footer';
import api from './Api';
import Card from './Card';
import UserInfo from './UserInfo';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';


export default function App(){

  // const api = new Api();

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

const [openPopup, setOpenPopup] = React.useState('')

const [selectedCard, setSelectedCard] = React.useState(''); //para saber qué card está seleccionada

const [errors, setErrors]= React.useState({profile: {}, addCard: {}, avatar: {} });

const [nameValue, setNameValue]= React.useState('');

const[aboutValue, setAboutValue]= React.useState('');


// 3 HANDLE PARA CARD
function handleClickImage(event){
  setOpenPopup('popupImage');
  const id = event.target.getAttribute('data-card-id');
  const card = cards.find(item => {
    return item._id == id;
  })
  setSelectedCard(card)
}

function handleLikeCard(event){
  setSelectedCard(event.target.getAttribute('data-card-id')); //localiza qué Card selecciona el user

  const LikesUser = this._likes.filter(user => user._id === this._me.id)
  if (LikesUser.length > 0) {
    api.deleteCardLike(this._id).then(data => {
      this._likes = data.likes;
      this._likeCounter = data.likes.length;
      this._element.querySelector(".card__like-counter").textContent = data.likes.length;
    })

  } else {
    api.addCardLike(this._id).then(data => {
      this._likes = data.likes;
      this._likeCounter = data.likes.length;
      this._element.querySelector(".card__like-counter").textContent = data.likes.length;
    })
  }

}

function handleDeleteCard(event){
  setOpenPopup('confirmation');
  setSelectedCard(event.target.getAttribute('data-card-id')); //localiza qué Card selecciona el user
}


function handleConfirmation(event){
  setOpenPopup('confirmation')
}

// 3 HANDLE PARA UserInfo
function handleEditAvatar(event){
setOpenPopup('avatar')
}

function handleEditProfile(event){
  setOpenPopup('profile')
}

function handleClickAdd(event){
  setOpenPopup('addCard')
}

function handelClosePopup(event){
  setOpenPopup('');
}

// envía el form de EDIT PROFILE y lo cierra:
function handleSubmitProfile(event){
  event.preventDefault();
  api.editProfile(event.target.elements['name'].value, event.target.elements['about'].value).then(json => {
setUser(json);
handelClosePopup();
  })
}

function handleSubmitAvatar(event){
  event.preventDefault();
  const linkValue = event.target.elements['link'].value;
  api.newAvatar(linkValue).then(json => {
    setUser(json);
    handelClosePopup();
      })
}

// envía el form de ADD CARD y lo cierra:
function handleSubmitAddCard(event) {
  event.preventDefault();
  const titleValue = event.target.elements['title'].value;
  const imageValue = event.target.elements['image'].value;
  api.addNewCard(titleValue, imageValue).then(data => {
    setCards([...cards, data]);
    handelClosePopup();
  })
}

// envía el form Confirmation y lo cierra:
function handleSubmitConfirmation(event){
  event.preventDefault();
  api.deleteCard(setSelectedCard) //borra la card seleccionada
}



  return (
    <div className="page">

<Header/>

      <main>
        <UserInfo user={user}
        handelOpenPopup={() => {setOpenPopup('profile')}}
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
      </main>

      <Footer/>



{/* CONFIRMATION (DELETE) */}
    <PopupWithForm
    name={'confirmation'}
    open={openPopup === 'confirmation'}
    errors={errors}
    setErrors={setErrors}
    handleClose={handelClosePopup}>
    <div id="popupDelete" >
        <form id="formDelete"  onSubmit={handleSubmitConfirmation} action="" className="popup popup_question" name="delete-card" noValidate>
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
    <PopupWithForm
    name={'profile'}
    open={openPopup === 'profile'}
    errors={errors}
    setErrors={setErrors}
    handleClose={handelClosePopup}>

    <div id="profilePopup">
      <form id="form" onSubmit={handleSubmitProfile}  action="" className="popup" name="edit-profile" noValidate>
        <h4 className="popup__title-popup">Edit profile</h4>
        <fieldset className="popup__fieldset">
          <div className="popup__field">
            <input id="profileTitle" className={`popup__input-popup ${errors.profile.name ? 'popup__input-popup_error':''}`} type="text" placeholder="Nombre" name="name" required
              minLength="2" maxLength="40" />
            <span className="popup__error popup__error_name">{errors.profile.name}</span>
          </div>

          <div className="popup__field">
            <input id="profileSubtitle" className="popup__input-popup" type="text" placeholder="Acerca de mí" name="about"
              required minLength="2" maxLength="200" />
            <span className="popup__error popup__error_about">{errors.profile.about}</span>
          </div>
          <button id="save" type="submit" className="popup__button-popup">
            Guardar
          </button>
        </fieldset>
      </form>
    </div>
    </PopupWithForm>
  

    {/* AVATAR */}
    <PopupWithForm
    name={'avatar'}
    open={openPopup === 'avatar'}
    errors={errors}
    setErrors={setErrors}
    handleClose={handelClosePopup}>

    <div id="popupAvatar">
        <form id="formAvatar" onSubmit={handleSubmitAvatar} action="" className="popup popup_avatar" name="edit-avatar" noValidate>
          <h4 className="popup__title-popup">Cambiar foto de perfil</h4>
          <fieldset className="popup__fieldset">
            <div className="popup__field">
              <input id="profileAvatar" className="popup__input-popup" type="url" placeholder="Enlace a tu avatar" name="avatar"
                required   />
              <span className="popup__error popup__error_avatar">{errors.avatar.avatar}</span>
            </div>
            <button id="saveAvatar" type="submit" className="popup__button-popup">
              Guardar
            </button>
          </fieldset>
        </form>
      </div>
    </PopupWithForm>

    
{/* ADD CARD */}
    <PopupWithForm
     name={'addCard'}
     open={openPopup === 'addCard'}
     errors={errors}
     setErrors={setErrors}
    handleClose={handelClosePopup}>

    <div id="popupAddContainer">
      <form id="formAdd" onSubmit={handleSubmitAddCard}  action="" className="popup" name="add-place" noValidate>
        <h4 className="popup__title-popup">Nuevo lugar</h4>
        <fieldset className="popup__fieldset">
          <div className="popup__field">
            <input id="addTitle" name="title" className="popup__input-popup" type="text" placeholder="Título" required
              minLength="2" maxLength="30" />

            <span className="popup__error popup__error_title">{errors.addCard.title}</span>
          </div>
          <div className="popup__field">
            <input id="addImage" name="image" className="popup__input-popup" type="url" placeholder="Enlace a la imagen"
              required />

            <span className="popup__error popup__error_image">{errors.addCard.image}</span>
          </div>
          <button id="createButton" type="submit" className="popup__button-popup">
            Crear
          </button>
        </fieldset>
      </form>
    </div>
    </PopupWithForm>

{/* IMAGE POPUP */}
  <PopupWithImage
   name={'popupImage'}
   open={openPopup === 'popupImage'}
  selectedCard={selectedCard}
  handleClose={handelClosePopup}/>

</div>

  );

}


