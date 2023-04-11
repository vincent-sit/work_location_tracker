import React from "react";
import "./index.css";
import { X } from "@phosphor-icons/react";
import { useAlert } from "../../contexts/AlertContext";

const Alert = (props) => {
  const {isAlertOn, switchAlert, alertMessage, setAlertMessage} = useAlert();

  function handleClick() {
    switchAlert();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    setAlertMessage(formJson.entry);
  }

  return (
    <>
      <form className="alert" onSubmit={handleSubmit}>
        <div className="close-icon" onClick={handleClick}>
          <X size={32}/>
        </div>    
        <span for={props.alertId} className="question">{props.question}</span>
        <input className="inputField" type="text" id={props.alertId} name="entry"></input>
        <div className="alert-buttons">
          <input className="alert-button left" type="submit" value="Submit"></input>
          <input className="alert-button right" type="button"value="Cancel" onClick={handleClick}></input>
        </div>
      </form>
    </>
  )
}

export default Alert;