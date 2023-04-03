import React from "react";
import CalendarDay from "../CalendarDay";
import CalendarHeader from "../CalendarHeader";
import {GetDateString} from "../../dateFunctions";
import './index.css';

function FindWeekDayViaIndex(dayIndex) {
  switch(dayIndex) {
    case 0:
      return "Sunday";    
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid day";
  }
}

function CreateCalendarDay(dayToAdd, key) {
  const date = new Date();  
  date.setDate(date.getDate() + dayToAdd);  
  const dateString = GetDateString(date);

  const dayIndex = date.getDay();
  const day = FindWeekDayViaIndex(dayIndex);

  return (    
    <CalendarDay date={dateString} day={`${day}`} key={key}/>
  );
}

const SetCalendarDays = (days) => {
  const dayBlocks = [];
  let count = days.length;
  console.log(count);

  for (var i=0; i<count; i++) {
    dayBlocks.push(CreateCalendarDay(days[i], i));    
  }

  return dayBlocks;
}

const Calendar = (props) => {
  return (
    <div className="calendar">
      <CalendarHeader days={props.days}/>      
      <div className="days"> 
        {SetCalendarDays(props.days)}
      </div>        
    </div>    
  )
}

export default Calendar;