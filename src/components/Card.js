import React from "react";

import {CurrentUserContext} from "../context/CurrentUserContext"

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  //--- Funcion si el dueño le dio like -->> ¿¿¿¿¿ BORRO ESTO B??????
  function hasOwnerLike() {
    return props.likes.some((item) => item._id && item._id === props.user._id);
  }

  // SRINT 11:Verificando si el usuario actual es el propietario de la tarjeta actual
const isOwn = card.owner._id === currentUser._id;

// SRINT 11:Creando una variable que después establecerás en `className` para el botón eliminar
const cardDeleteButtonClassName = (
  `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
); 


// SRINT 11:Verifica si el usuario actual le dio "like" a la tarjeta ****
// const isLiked = card.likes.some(i => i._id === currentUser._id);

// SRINT 11:Crea una variable que después establecerás en `className` para el botón like
const cardLikeButtonClassName = `card__card-like_active`; 

// SRINT 11: handle del botón like
function handleCardLike() {
  props.onCardLike(props.cardId);
}

//controlador de clics handleLikeClick() > llama a onCardLike() desde este componente y pasa el argumento card igual que como lo hiciste con el controlador handleClick().

  return (
    <>
      <div className="card">
        <button
          className={cardDeleteButtonClassName}
          onClick={props.handleDeleteCard}
          data-card-id={props.cardId}
        ></button>

        <img
          className="card__img-card"
          src={props.link}
          alt=""
          onClick={props.handleClickImage}
          data-card-id={props.cardId}
        />

        <div className="card__card-body">
          <h3 className="card__card-title">{props.title}</h3>
          <div className="card__like-container">
            <button
              onClick={handleCardLike}
              data-card-id={props.cardId}
              className={`card__card-like ${
                hasOwnerLike() ? cardLikeButtonClassName : ""
              }`}
            ></button>
            <p id="countLikes" className="card__like-counter">
              {props.likes.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
