
import UserInfo from "./UserInfo";
import Card from "./Card";
import React from "react";

export default function Main(props) {
  return (
    <>
      <main>
        <UserInfo user={props.user}
                  handelOpenPopup={() => {props.setOpenPopup('profile')}}
                  handleEditAvatar={props.handleEditAvatar}     //profile__avatar-edit
                  handleEditProfile={props.handleEditProfile}   //profile__edit-button
                  handleClickAdd={props.handleClickAdd}        //profile__add-button
        />

        <div className="cards">
          {props.cards.map(item => <Card
            user={props.user}
            cardId={item._id}
            title={item.name}
            link={item.link}
            likes={item.likes}
            owner={item.owner}
            handleClickImage={props.handleClickImage}
            handleLikeCard={props.handleLikeCard}
            handleDeleteCard={props.handleDeleteCard}
            key={item._id}
          />)}
        </div>
      </main>
    </>
  )
}