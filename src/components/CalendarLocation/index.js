import React from "react";
import "./index.css";

const CalendarLocation = (props) => {  

  return (
    <>
      <div 
        className={props.location === "" ? "" : "location"}>
        {props.location}
      </div>
    </>
  )
}

export default CalendarLocation;