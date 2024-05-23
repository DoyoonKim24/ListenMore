import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import PlaylistPage from './components/PlaylistPage';
import Dashboard from './components/Dashboard';
import './App.css';


export default function App() {
  const [token, setToken] = useState('');
  const [data, setData] = useState('');
  const code = new URLSearchParams(window.location.search).get("code")
  if (token) {
    setToken(code);
  }
  return  code ? <Dashboard code={code} /> : <Login />

}
