import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import ContactList from './components/contacts/ContactList';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router';
import ContactEdit from './components/contacts/ContactEdit';
import Login from './components/login/Login';
import { createContext } from 'react';
import { UserAccount } from './components/login/model/UserAccount';
import AboutPage from './components/about-page/AboutPage';
import ProtectedRoutes from './components/helper/ProtectedRoutes';
import UserInfo from './components/login/UserInfo';
import Menu from './components/helper/Menu';
import ContactSearch from './components/contacts/ContactSearch';

type UserAccountContextType = {
  userAccount: UserAccount | null;
  setUserAccount: React.Dispatch<React.SetStateAction<UserAccount | null>>
}

export const UserAccountContext = createContext<UserAccountContextType | null>(null);

function App() {
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  useEffect(() => {
    const checkForInactivity = () => {

      const expireTime = sessionStorage.getItem("expireTime");

      if (!expireTime) {
        return;
      }
      
      if (parseInt(expireTime) >= Date.now()) {
        return;
      }

      let jwt = sessionStorage.getItem("jwt");
      if (!jwt || jwt === '') {
        return;
      }

      sessionStorage.removeItem('jwt');
      alert("You have been logged after 15 minutes of inactivity.");
      //TODO replace hard coded 15 with value from emv file
      window.document.location = "/";
    };
    
    const interval = setInterval(
      checkForInactivity,
      parseInt(process.env.REACT_APP_INACTIVITY_CHECK_INTERVAL_IN_MS as string)
    )
  
    return (() => clearInterval(interval));
  }, []); 

  useEffect(() => {
    const updateExpireTime = () => {
      const expireTime: number = Date.now() + parseInt(process.env.REACT_APP_EXP_INTERVAL_IN_MIN as string) * 60 * 1000;
      sessionStorage.setItem('expireTime', expireTime + '');
    };

    const addEventListeners = () => {
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
      window.addEventListener("scroll", updateExpireTime);
      window.addEventListener("mousemove", updateExpireTime);
    };

    const removeEventListeners = () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };

    updateExpireTime();
    addEventListeners();

    return removeEventListeners;
  }, []);

  return (
    <div>
      <BrowserRouter>

      <UserAccountContext.Provider value = {{userAccount, setUserAccount}}>
        {userAccount && <UserInfo jwt = {sessionStorage.getItem("jwt")}/>}
          <h1>Hello this is Chris and this is my first react app</h1>
        {userAccount && <Menu className = "menu-bar"/>}
        <p></p>
          <Routes>
            <Route path="/" element = {
              <Login/>
            }/>
            <Route path="/contactlist" element = {
              <ProtectedRoutes>
                <ContactList/>
              </ProtectedRoutes>
            }/>
            <Route path="/contactedit/:paramId" element = {
              <ProtectedRoutes>
                <ContactEdit/>
              </ProtectedRoutes>
            }/>
            <Route path="/aboutpage" element = {
              <ProtectedRoutes>
                <AboutPage/>
              </ProtectedRoutes>
            }/>
            <Route path="/searchcontact" element = {
              <ProtectedRoutes>
                <ContactSearch/>
              </ProtectedRoutes>
            }/>
          </Routes>
      </UserAccountContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;