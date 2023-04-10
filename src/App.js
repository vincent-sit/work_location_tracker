import React from 'react';
import { UserIdProvider } from './contexts/UserIdContext';
import { NavbarProvider } from './contexts/NavbarContext';
import "./App.css";
import UserProfile from './pages/UserProfile';
import LandingPage from "./pages/LandingPage"
import NavBar from './components/NavBar';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  const id = "3";

  return (
    <NavbarProvider>
      <UserIdProvider userId={id}>
        <NavBar/>
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>

      </UserIdProvider>
    </NavbarProvider>
)};

export default App;