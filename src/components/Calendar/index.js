import React, {useState, useEffect, useRef} from "react";
import CalendarDay from "../CalendarDay";
import CalendarHeader from "../CalendarHeader";
import {GetDateStringYYMMDD} from "../../dateFunctions";
import './index.css';
import { useUserId } from "../../contexts/UserIdContext";
import Endpoints from "../../apiEndpoints";

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

function getLastDay(startDate, daysCount, includeWeekends) {
  let count = daysCount;
  let finalDay = new Date();

  for (var i=0; i<daysCount*2 && count > 0; i++) {    
    const currDate = new Date(startDate);
    currDate.setDate(currDate.getDate() + i);
    const dayIndex = currDate.getDay();
    
    if (includeWeekends || (dayIndex != 0 && dayIndex != 6)) {
      finalDay = currDate;      
      count--;
    }
  }
  return finalDay;
}

function collectAllVisibleDaysAndData (startDate, daysCount, includeWeekends, data) {  
  const listOfDaysWithDetails = [];
  // temp set the most amount of cards you can show is 14
  let count = daysCount;  
  for (var i=0; i<daysCount*2 && count > 0; i++) {    
    const currDate = new Date(startDate);
    currDate.setDate(currDate.getDate() + i);    
    const dayIndex = currDate.getDay();
    
    if (includeWeekends || (dayIndex != 0 && dayIndex != 6)) {
      let newObj = {};      
      if (data && data[i] && data[i].hasOwnProperty("date")) {        
        const {locationId, date} = data[i];
        newObj = {locationId};
        newObj["date"] = new Date(date);        
      } else {        
        newObj["date"] = currDate;
      }
      newObj["dayOfWeek"] = FindWeekDayViaIndex(dayIndex);
      listOfDaysWithDetails.push(newObj);
            
      count--;      
    }
  }
  return listOfDaysWithDetails;
}

function CreateCalendarDay(dayWithDetailsObject, key) {  
  const locationId = dayWithDetailsObject.locationId == null ? "" : dayWithDetailsObject.locationId;

  return (    
    <CalendarDay date={dayWithDetailsObject.date} 
      day={`${dayWithDetailsObject.dayOfWeek}`}
      locationId={`${locationId}`}
      key={key}
    />
  );
}

const SetCalendarDays = (listOfDaysWithDetails) => {
  const dayBlocks = [];
  let count = 0;  
  for (let i=0; i<listOfDaysWithDetails.length; i++) {
    dayBlocks.push(CreateCalendarDay(listOfDaysWithDetails[i], count++));
  }

  return dayBlocks;
}

const Calendar = (props) => {
  const [lastDay, setLastDay] = useState(new Date());    
  const [dataForGeneratingCards, setDataForGeneratingCards] = useState([]);
  const {userId} = useUserId();

  useEffect(() => {
    async function getDataWithinTimeRange(newLastDay) {
      const todayDateString = GetDateStringYYMMDD(new Date());
      const lastDateString = GetDateStringYYMMDD(new Date(newLastDay));
      const fullUrl = `${Endpoints.GETTransactionsBetweenDates}?userid=${userId}&startdate=${todayDateString}&enddate=${lastDateString}`
      try {
        const response = await fetch(fullUrl);
        if (response.status === 200) {
          const data = await response.json();
          setDataForGeneratingCards(
            collectAllVisibleDaysAndData(new Date(), props.daysToShow, props.includeWeekends, data)
          );
          
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error(error);
      }
    };
    const newLastDay = getLastDay(new Date(), props.daysToShow, props.includeWeekends);
    setLastDay(newLastDay);
    
    getDataWithinTimeRange(newLastDay);
    
  }, [props])

  return (
    <div className="calendar">      
      <CalendarHeader finalDay={lastDay}/>      
      <div className="days"> 
        {SetCalendarDays(dataForGeneratingCards)}
      </div>        
    </div>    
  )
}

export {Calendar, collectAllVisibleDaysAndData, getLastDay};