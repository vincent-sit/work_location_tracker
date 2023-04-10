import React from "react";
import { GetDateStringDDMMYY } from "../../dateFunctions";
import "./index.css";

const CalendarHeader = (props) => {

  return (
    <>
      <header>        
        <div className="calendar__title" id="calendarTitle">          
          <h1 className=""><span></span>From {GetDateStringDDMMYY(new Date())} to {GetDateStringDDMMYY(new Date(props.finalDay))} </h1>          
        </div> 
        <div style={{alignself:"flex-start", flex: "0 0 1"}}></div>
      </header>
    </>
  )
}

export default CalendarHeader;