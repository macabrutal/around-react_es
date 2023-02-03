import React from "react";


export default function Main(props){
   
    return (
        <>

<main className="content">


      <div className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img src=" " alt="avatar" className="profile__avatar" />
            <div className="profile__avatar-opacity">
              <button className="profile__avatar-edit"></button>
            </div>
          </div>
          <div className="profile__intro">
            <h1 className="profile__title">Jacques Cousteau</h1>
            <button id="open-edit-button" className="profile__edit-button"></button>
            <h2 className="profile__subtitle">Explorador</h2>
          </div>
        </div>
        <button id="open-add-button" className="profile__add-button"></button>
      </div>



      
    </main>
  
        </>
    )

}