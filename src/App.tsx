import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ContactList from './components/contacts/ContactList';
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import ContactEdit from './components/contacts/ContactEdit';
import Login from './components/login/Login';
import { createContext } from 'react';
import { UserAccount } from './components/login/model/UserAccount';

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
      <h1>Hello this is Chris and this is my first react app</h1>
      <UserAccountContext.Provider value = {{userAccount, setUserAccount}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {
              <Login/>
            }/>
            <Route path="/contactlist" element = {
              <ContactList/>
            }/>
            <Route path="/contactedit/:paramId" element = {
              <ContactEdit/>
            }/>
          </Routes>
        </BrowserRouter>
      </UserAccountContext.Provider>
    </div>
  );
}

export default App;
