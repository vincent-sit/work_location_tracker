import React, {useState, useEffect} from 'react';
import { useUserId } from '../../contexts/UserIdContext';
import Calendar from '../../components/Calendar';
import "./index.css";
import Endpoints from '../../apiEndpoints';

function findWorkDays (daysCount, includeWeekends) {
  const days = [];
  
  // temp set the most amount of cards you can show is 14
  let count = daysCount;

  for (var i=0; i<daysCount*2 && count > 0; i++) {    
    const today = new Date();
    today.setDate(today.getDate() + i);
    const dayIndex = today.getDay();
    
    if (includeWeekends || dayIndex != 0 && dayIndex != 6) {
      days.push(i);
      count--;      
    }
  }  
  return days;
}

const UserProfile = () => {
  const [userDisplayName, setUserDisplayName] = useState("user");
  const [daysToShow, setDaysToShow] = useState(5);
  const [includeWeekends, setIncludeWeekends] = useState(false);
  const {userId} = useUserId();  
  
  // useEffect to get displayName from user ID and update displayName
  useEffect(() => {
    async function getUserDataById(id) {
      const fullUrl = `${Endpoints.GETUserById}/${id}`;
      await fetch(fullUrl)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error encountered. Check id.");
        })
        .then(data => {
          setUserDisplayName(data.displayName);
        })
        .catch(error => {
          alert("There was a problem fetching the data. ", error);
        });
    }
    
    getUserDataById(userId);
  });

  useEffect(() => {
    const getDaysToShowAndIncludeWeekends = async (id) => {
      const fullUrl = `${Endpoints.GETUserById}/${id}`;
      const response = await fetch(fullUrl);
      const data = await response.json();
      setDaysToShow(Math.min(data.daysToShow, 14));
      setIncludeWeekends(data.includeWeekends);
    };
  
    getDaysToShowAndIncludeWeekends(userId);

  });
  
  return (
    <>
      <div>
        <h1 id="greeting">Hi {userDisplayName}, where are you working for the next {daysToShow} days?</h1>
        <Calendar days={findWorkDays(daysToShow, includeWeekends)}/>        
      </div>
    </>
)};


export default UserProfile;