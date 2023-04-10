import React, {useState, useEffect} from 'react';
import { useUserId } from '../../contexts/UserIdContext';
import {Calendar} from '../../components/Calendar';
import "./index.css";
import Endpoints from '../../apiEndpoints';
import { useNavbarOpen } from '../../contexts/NavbarContext';

const UserProfile = () => {
  const [userDisplayName, setUserDisplayName] = useState("user");
  const [userData, setUserData] = useState({});
  const [daysToShow, setDaysToShow] = useState(6);
  const [includeWeekends, setIncludeWeekends] = useState(false);
  const {userId} = useUserId();
  const {isNavbarOpen} = useNavbarOpen();
  
  // useEffect to get displayName from user ID and update displayName
  useEffect(() => {
    async function getUserDataById(id) {
      const fullUrl = `${Endpoints.GETUserById}/${id}`;
      try {
        const response = await fetch(fullUrl);
        if (response.status === 200) {
          const data = await response.json();
          setUserData(data);          
          setUserDisplayName(data.displayName);
        } else throw new Error();
      }
      catch (error) {
        alert("There was a problem fetching the data. ", error);
      }
    }

    getUserDataById(userId);
  }, [userId]);

  useEffect(() => {
    const getDaysToShowAndIncludeWeekends = () => {      
      setDaysToShow(Math.min(userData.daysToShow, 14));
      setIncludeWeekends(userData.includeWeekends);
    };
      
    getDaysToShowAndIncludeWeekends();

  }, [userData]);
  
  return (
    <>      
      <div className={isNavbarOpen ? "grayout" : ""}></div>
      <div>
          <h1 id="greeting">Hi {userDisplayName}, where are you working for the next {daysToShow} days?</h1>        
        <Calendar daysToShow={daysToShow} includeWeekends={includeWeekends}/>
      </div>
    </>
)};


export default UserProfile;