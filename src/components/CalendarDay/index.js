import React, {useEffect, useState} from "react";
import Endpoints from "../../apiEndpoints";
import "./index.css";

const userId = "1";
const url = "https://localhost:7227/api";

const CalendarDay = ({day, date}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [location, setLocation] = useState("");
  const scaleValue = isHovered ? 1.075 : 1;
  const dateParts = date.split("-");
  const dd = dateParts[0];
  const mm = dateParts[1];
  const yy = dateParts[2];

  // should automatically load the location on the day - but if it does not have an entry in the locationOnDate table, return empty string
  // otherwise, return the location as text
  // when clicked, pop up to allow edit - if edit is submitted, make change
  // 1) if location does not exist for user, create location for user AND submit entry to locationOnDate table (need to make this into a single transaction)
  // 2) if location exists, update entry to locationOnDate table
  // once this is done - make useEffect update

  // TODO: figure out why useEffect is being called twice
  // load location of the day, return empty if no location found
  useEffect(() => {    
    async function getLocationIdAndSetLocation() {      
      const fullUrl = `${Endpoints.GETTransactionByDateAndUser}?userid=${userId}&date=${yy}-${mm}-${dd}T00:00:00.000Z`;
      try {
        await fetch(fullUrl)
          .then(response => {
            return response.json();
          })
          .then(data => {
            return data.locationId;
          })
          .then(async data => {
            await fetch(`${Endpoints.GETLocationById}?id=${data}`)
              .then(response => {
                return response.json();
              })
              .then(data => {
                setLocation(data.name);
              })
          })
      } catch (error) {
        console.log("Error encountered. There is no location registered for this location.");
        setLocation("");
      }
    }
    getLocationIdAndSetLocation();
  }, [location]);

  // TODO: decide if a separate location table is necessary or should I just keep using location as its id?  
  const submitLocation = async (locationEntered) => {    
    // check to see if the location exists
    try {
      // currently the problem is that the default response being null is throwing errors into the system
      const getLocationResponse = await fetch(`${Endpoints.GETLocationByNameAndUser}?locationName=home&userId=1`);
      // const getLocationResponse = await fetch(`${url}/Locations/nameAndUser?locationName=${locationEntered}&userId=${userId}`);      
      const location = getLocationResponse ? await getLocationResponse.json() : null;
    
      if (!location) {
        const newLocation = { name: locationEntered, userId: userId };
        const newLocationResponse = await fetch(`${Endpoints.POSTNewLocation}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLocation)
        });
        location = await newLocationResponse.json();
      }

      const newEntry = { UserId: `${userId}`, LocationId: `${location.id}`, Date: `${yy}-${mm}-${dd}T00:00:00.000Z`}
      const newTransactionResponse = await fetch(`${Endpoints.POSTNewTransaction}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      });
    
      // If second API call fails, rollback the first API call
      if (!newTransactionResponse.ok) {
        await fetch(`${Endpoints.DELETELocation}`, { method: 'DELETE' });
      }
    
        // Return the result of the second API call
      return newTransactionResponse.json();
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick() {
    const locationEntered = prompt("What location will you be working from?");
    // if submission is empty, null or undefined, then ignore
    if (!locationEntered) return;
    submitLocation(locationEntered);
  }

  function handleMouseOver() {
    setIsHovered(true);
  }

  function handleMouseOut() {
    setIsHovered(false);
  }

  const stylesOnHover = {
    transform: `scale(${scaleValue})`,
    transition: "0.12s ease-in-out",
    cursor: 'pointer',
  };

  return (
    <div className="calendarDay"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      style={stylesOnHover}
    >
      <div className="calendarHeader">
        <div className="dayOfWeek">{day}</div>        
        <div>{date}</div>        
      </div>
      <div className="calendarBody">{location}</div>
    </div>
  )
};

export default CalendarDay;