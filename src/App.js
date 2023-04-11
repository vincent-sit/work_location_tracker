import React from 'react';
import { UserIdProvider } from './contexts/UserIdContext';
import { NavbarProvider } from './contexts/NavbarContext';
import { AlertProvider } from './contexts/AlertContext';
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
        <AlertProvider>
          <NavBar/>
          <Routes >
            <Route path="/" Component={LandingPage} />
            <Route path="/profile" Component={UserProfile} />
          </Routes>
        </AlertProvider>

      </UserIdProvider>
    </NavbarProvider>
)};

export default App;