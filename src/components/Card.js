import React from "react";


export default function Card(props){


  //Funcion si el dueño le dio like
  function hasOwnerLike() {
    return props.like.some(item => item.owner._id == props.user._id);
    // return false;
  };


    return (
        <>
        <div classNameName="card">
           <button classNameName="card__delete-button"  onClick={props.handleDeleteCard}></button>
           <img className="card__img-card" src={props.link} alt="" onClick={props.handleClickImage}/>
            
           <div className="card__card-body">
             <h3 className="card__card-title">{props.title}</h3>
             <div className="card__like-container">
                <button 
                 onClick={props.handleLikeCard}
                className={`card__card-like ${hasOwnerLike() ? 'card__card-like_active' : ''}`}></button>
                 <p id="countLikes" className="card__like-counter">{props.likes.length}</p>
             </div>

           </div> 
        </div>

        </>
    )

}


