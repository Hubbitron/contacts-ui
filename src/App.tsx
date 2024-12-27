import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactList from './components/contacts/ContactList';
import { BrowserRouter, Route, Router, Routes } from 'react-router';

function App() {
  return (
    <div>
      <h1>Hello this is Chris and this is my first react app</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {
            <ContactList/>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
