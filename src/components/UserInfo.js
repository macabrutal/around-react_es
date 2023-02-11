import React from "react";

export default function UserInfo(props) {
  return (
    <>
      <div className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              src={props.user.avatar}
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
            <h1 className="profile__title">{props.user.name}</h1>

            <button
              id="open-edit-button"
              className="profile__edit-button"
              onClick={props.handleEditProfile}
            ></button>
            <h2 className="profile__subtitle">{props.user.about}</h2>
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
