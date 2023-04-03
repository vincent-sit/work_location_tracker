import React, {useState, useEffect} from 'react';
import "./App.css";
import Calendar from './components/Calendar/index';

const userId = "1";
const url = "https://localhost:7227/api";

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

const App = () => {
  const [userDisplayName, setUserDisplayName] = useState("user");
  const [daysToShow, setDaysToShow] = useState(5);
  const [includeWeekends, setIncludeWeekends] = useState(false);
  // useEffect to get the daysToShow and includeWeekends for the user
  
  // useEffect to get displayName from user ID and update displayName
  useEffect(() => {
    async function getUserDataById(url, id) {
      const fullUrl = `${url}/users/${id}`;
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
    
    getUserDataById(url, userId);
  });

  useEffect(() => {
    const getDaysToShowAndIncludeWeekends = async (url, id) => {
      const fullUrl = `${url}/users/${id}`;
      const response = await fetch(fullUrl);
      const data = await response.json();
      setDaysToShow(Math.min(data.daysToShow, 14));
      setIncludeWeekends(data.includeWeekends);
    };
  
    getDaysToShowAndIncludeWeekends(url, userId);

  });

  
  return (
    <>
      <div>
        <h1 id="greeting">Hi {userDisplayName}, where are you working for the next {daysToShow} days?</h1>
        <Calendar days={findWorkDays(daysToShow, includeWeekends)}/>
      </div>
    </>
)};


export default App;