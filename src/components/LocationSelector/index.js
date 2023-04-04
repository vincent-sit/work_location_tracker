import React, {useEffect, useState} from 'react';
import DropdownBox from '../DropDownList';
import Endpoints from '../../apiEndpoints';
import "./index.css";

const userId = "1";

const CustomAlert = ({ locationList, message }) => {
  const [locations, setLocations] = useState([]);
  // get locations from locationAPI
  useEffect(() => {
    async function getLocations() {
      const fullUrl = `${Endpoints.GETLocationsByUser}?userid=${userId}`;
      try {
        await fetch(fullUrl)
        .then (response => )
      }
    }
  })

  return (
    <div className="alert">
      <p className="closeButton">x</p>
      <DropdownBox options={["one", "two"]}/>
      <p>{message}</p>
    </div>
  );
}

export default CustomAlert;
