import React from "react";

import Popup from './Popup'

export default function PopupWithImage(props){
    return (
        <>
    <Popup open={props.open} handleClose={props.handleClose}>
       <>
         <img src={props.selectedCard.link} alt="" className="image-container__image-popup" />
         <p className="image-container__text-image">{props.selectedCard.title}</p>
       </>
    </Popup>
        </>
    )
}


//selectedCard : son las propiedades de las CARDS seleccionadas