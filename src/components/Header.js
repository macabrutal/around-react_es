import React from "react";
import logo from '../images/logo.png';

export default function Header(props){
   
    return (
        <>
            <header className="header">
      <img className="header__logo" src={logo} alt="logo" />

      <hr className="header__line" />
    </header>
        </>
    )
}