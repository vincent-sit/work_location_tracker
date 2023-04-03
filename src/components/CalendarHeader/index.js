import React from "react";
import { GetDateString } from "../../dateFunctions";
import "./index.css";

const CalendarHeader = (props) => {
  const daysToAdd = props.days[props.days.length - 1];
  const finalDay = new Date();
  finalDay.setDate(finalDay.getDate() + daysToAdd);
  return (
    <>
      <header>        
        <div className="calendar__title" id="calendarTitle">          
          <h1 className=""><span></span>From {GetDateString(new Date())} to {GetDateString(finalDay)} </h1>          
        </div> 
        <div style={{alignself:"flex-start", flex: "0 0 1"}}></div>
      </header>
    </>
  )
}

export default CalendarHeader;