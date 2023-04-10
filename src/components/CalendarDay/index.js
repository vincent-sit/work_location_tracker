import React, {useEffect, useState, useRef} from "react";
import { useUserId } from "../../contexts/UserIdContext";
import Endpoints from "../../apiEndpoints";
import "./index.css";
import { GetDateStringYYMMDD } from "../../dateFunctions";
import CalendarLocation from "../CalendarLocation";


const CalendarDay = (props) => {  
  const [isHovered, setIsHovered] = useState(false);
  const scaleValue = isHovered ? 1.075 : 1;

  const isFirstRendered = useRef(true);  
  const [triggerEffect, setTriggerEffect] = useState(false);
  
  const [location, setLocation] = useState("");
  const [currLocationId, setCurrLocationId] = useState(props.locationId);
  const userId = useUserId().userId;
  
  // generates a datestring in the format of ""yy-mm-dd"
  const newDateString = GetDateStringYYMMDD(new Date(props.date));

  // update the locationId beyond what was originally handed down to us from parent component
  // only when it is not the first rendered
  // updates whenever the component has been clicked and submitted
  useEffect(() => {
    async function getNewLocationId() {
      const fullUrl = `${Endpoints.GETTransactionByDateAndUser}?userid=${userId}&date=${newDateString}`;
      try {
        await fetch(fullUrl)
        .then(response => {            
          if (response.status === 500) throw new Error("No location for this day has been set");
          return response.json();
        })
        .then(data => {          
          setCurrLocationId(data.locationId);
        })
      } catch (error) {
      }
    }
    if (!isFirstRendered.current) {
      getNewLocationId();
    }
  }, [triggerEffect]);

  // whenever the locationId updates, calls this function to get location name
  useEffect(() => {
    async function getLocationNameFromId() {
      if (currLocationId) {        
        await fetch(`${Endpoints.GETLocationById}?id=${currLocationId}`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setLocation(data.name);
        })
      } else {
        setLocation("");
      }
    }
    getLocationNameFromId();    
  }, [currLocationId])

  useEffect(() => {    
    isFirstRendered.current = false;
  }, []);
  
  const submitLocation = async (locationEntered) => {    
    try {      
      // first check if day already has location allocated to it, if it does, then it's a potential update rather than create      
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

      setTriggerEffect(!triggerEffect);

    } catch (error) {
      alert(error);
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
        <div className="dayOfWeek">{props.day}</div>        
        <div>{GetDateStringYYMMDD(new Date(props.date))}</div>        
      </div>
      <CalendarLocation className="calendarBody" locationId={currLocationId} location={location}></CalendarLocation>
    </div>
  )
};

export default CalendarDay;