import React from "react";


export default function Popup(props){
   
    return (
        <>
        
            <div className={`popup-container ${props.open ? 'popup-container_show' : ''}`}>
                <button
                onClick={props.handleClose}
                className="popup-container__close-popup">
                </button>
                {props.children}  
             </div>
        </>
    )
}


//LA BASE DE POPUP:
//1. abre
//2. cierra
//3.tiene el contenido de los hijos 


// --> CLASE POPUP escondido Y visible
//popup-container --> escondido
//popup-container_show --> visible

// --> CLASE BOTÓN X CERRAR
//popup-container__close-popup