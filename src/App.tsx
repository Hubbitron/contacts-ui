import React, { useState } from 'react';
import './App.css';
import ContactList from './components/contacts/ContactList';
import { BrowserRouter, Route, Router, Routes } from 'react-router';
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
  // const value = {userAccount, setUserAccount};
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