import React from "react";

import {CurrentUserContext} from "../context/CurrentUserContext"

export default function UserInfo(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="profile__avatar"
            />
            <div className="profile__avatar-opacity">
              <button
                className="profile__avatar-edit"
                onClick={props.handleEditAvatar}
              ></button>
            </div>
          </div>
          <div className="profile__intro">
            <h1 className="profile__title">{currentUser.name}</h1>

            <button
              id="open-edit-button"
              className="profile__edit-button"
              onClick={props.handleEditProfile}
            ></button>
            <h2 className="profile__subtitle">{currentUser.about}</h2>
          </div>
        </div>

        <button
          id="open-add-button"
          className="profile__add-button"
          onClick={props.handleClickAdd}
        ></button>
      </div>
    </>
  );
}

// --> DESDE APP TRAIGO 3 HANDLE:
// handleEditAvatar
// handleEditProfile
// handleClickAdd
