import React from "react";

export default function FormValidator(props) {
  function handleInput(event) {
    if (event.target.validity.valid) {
      props.errors[props.name][event.target.name] = "";
    } else {
      props.errors[props.name][event.target.name] =
        event.target.validationMessage;
    }
    props.setErrors({
      ...props.errors,
    });
  }

  return (
    <>
      {" "}
      {React.cloneElement(props.children, {
        onInput: handleInput,
      })}{" "}
    </>
  );
}
