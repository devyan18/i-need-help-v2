import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import UserForm from './components/UserForm';

const socket = io('/');

function App () {
  return (
    <>
      <UserForm />
    </>
  );
}

export default App;
