import React, {useEffect, useState} from "react";
import Endpoints from "../../apiEndpoints";
import "./index.css";

const userId = "1";

const CalendarDay = ({day, date}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [location, setLocation] = useState("");
  const scaleValue = isHovered ? 1.075 : 1;
  const dateParts = date.split("-");
  // generates a datestring in the format of ""yy-mm-dd"
  const newDateString = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`

  useEffect(() => {    
    async function getLocationIdAndSetLocation() {      
      const fullUrl = `${Endpoints.GETTransactionByDateAndUser}?userid=${userId}&date=${newDateString}T00:00:00.000Z`;
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
  }, [location, triggerEffect]);

  // TODO: decide if a separate location table is necessary or should I just keep using location as its id?  
  const submitLocation = async (locationEntered) => {    
    // check to see if the location exists
    try {
      // first check if day already has location allocated to it, if it does, then it's a potential update rather than create
      // TODO: decide if remove old location or not, or just change entry? Probably best to change entry
      const getLocationResponse = await fetch(`${Endpoints.GETLocationByNameAndUser}?locationName=${locationEntered}&userId=${userId}`);
      // check if response is a valid found response
      var location = getLocationResponse.status === 200 ? await getLocationResponse.json() : null;
      console.log(location);

      if (!location) {
        const newLocation = { name: locationEntered, userId: userId };
        const newLocationResponse = await fetch(`${Endpoints.POSTNewLocation}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLocation)
        });
        location = await newLocationResponse.json();
      }
            
      const newEntry = { UserId: `${userId}`, LocationId: `${location.id}`, Date: `${newDateString}T00:00:00.000Z`}
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

  async function handleClick() {
    const locationEntered = prompt("What location will you be working from?");
    // if submission is empty, null or undefined, then ignore
    if (!locationEntered) return;
    await submitLocation(locationEntered);
    setTriggerEffect(!triggerEffect);
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