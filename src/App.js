import React from 'react';
import { UserIdProvider } from './contexts/UserIdContext';
import "./App.css";
import UserProfile from './pages/UserProfile';

const App = () => {
  const id = "9c99490d-e90c-406f-84af-edd0b70cea04";

  return (
    <UserIdProvider userId={id}>
      <UserProfile />
    </UserIdProvider>
)};

export default App;