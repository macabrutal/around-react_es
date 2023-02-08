import React from "react";

import Popup from './Popup'
import FormValidator from './FormValidator'


export default function PopupWithForm(props){

    return (
    <Popup open={props.open} handleClose={props.handleClose}>
       <FormValidator name={props.name} setErrors={props.setErrors} errors={props.errors}>
             {props.children}
       </FormValidator>
    </Popup>
    )
}



