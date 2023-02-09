import React from "react";


export default function Card(props){


  //Funcion si el dueño le dio like
  function hasOwnerLike() {
    return props.likes.some(item => item._id && item._id == props.user._id);
    // return false;
  };


    return (
        <>
        <div className="card">

           <button className="card__delete-button"  
           onClick={props.handleDeleteCard}
           data-card-id={props.cardId} >
           </button>

           <img className="card__img-card" 
           src={props.link} 
           alt="" 
           onClick={props.handleClickImage}
           data-card-id={props.cardId} />
            
           <div className="card__card-body">
             <h3 className="card__card-title">{props.title}</h3>
             <div className="card__like-container">
                <button 
                 onClick={props.handleLikeCard}
                 data-card-id={props.cardId}
                className={`card__card-like ${hasOwnerLike() ? 'card__card-like_active' : ''}`}></button>
                 <p id="countLikes" className="card__like-counter">{props.likes.length}</p>
             </div>

           </div> 
        </div>

        </>
    )

}



