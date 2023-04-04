import React, {useEffect, useState} from "react";
import { useUserId } from "../../contexts/UserIdContext";
import Endpoints from "../../apiEndpoints";
import "./index.css";


const CalendarDay = ({day, date}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [location, setLocation] = useState("");
  const userId = useUserId().userId;
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
            if (response.status === 500) throw new Error("No location for this day has been set");
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
        setLocation("");
      }
    }
    getLocationIdAndSetLocation();
  }, [location, triggerEffect]);
  
  const submitLocation = async (locationEntered) => {    
    try {      
      // first check if day already has location allocated to it, if it does, then it's a potential update rather than create
      // TODO: decide if remove old location or not, or just change entry? Probably best to change entry
      const getLocationResponse = await fetch(`${Endpoints.GETLocationByNameAndUser}?locationName=${locationEntered}&userId=${userId}`);
      // check if response is a valid found response
      let locationFound = getLocationResponse.status === 200 ? await getLocationResponse.json() : null;
      let locationCreated = false;
      
      if (!locationFound) {
        const newLocation = { name: locationEntered, userId: userId };
        const newLocationResponse = await fetch(`${Endpoints.POSTNewLocation}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLocation)
        });
        locationFound = await newLocationResponse.json();
        locationCreated = true;
      }
      
      // check to see if the location exists    
      const getTransactionResponse = await fetch(`${Endpoints.GETTransactionByDateAndUser}?userid=${userId}&date=${newDateString}T00:00:00.000Z`);
      const transaction = getTransactionResponse.status === 200 ? await getTransactionResponse.json() : null;
      let newTransactionResponse = null;

      if (transaction) {          
        const updateEntry = { Id: `${transaction.id}`, UserId: `${userId}`, LocationId: `${locationFound.id}`, Date: `${newDateString}T00:00:00.000Z`}
        newTransactionResponse = await fetch(`${Endpoints.PUTTransaction}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateEntry)
        });
      } else {        
        const newEntry = { UserId: `${userId}`, LocationId: `${locationFound.id}`, Date: `${newDateString}T00:00:00.000Z`}
        newTransactionResponse = await fetch(`${Endpoints.POSTNewTransaction}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEntry)
        });
      }            
    
      // If write to transaction fails and a location was created, rollback the location that was created
      if (!newTransactionResponse.ok && locationCreated) {
        await fetch(`${Endpoints.DELETELocation}`, { method: 'DELETE' });
      }
          
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
    // refresh the location statement
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