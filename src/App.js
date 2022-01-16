import React, { useState } from 'react'
import Login from './pages/LoginForm'
import Register from './pages/RegisterPage'
import Home from './pages/HomePage'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

function App() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const Logins = details => {
    console.log(details)

    setUser({
      name: details.name,
      email: details.email,
      password: details.password
    });
  };

  const [loginSuccess, setLoginSuccess] = useState(false)
  const submitLogin = () => {
    setLoginSuccess(true);
    setUser({
      name: user.name,
      email: "",
      password: user.password,
    });
  };

  return (
    <div className="App">
      {(user.name == "" && user.email == "" && user.password == "") ? <Register Logins={Logins} /> : ""}
      {(user.name != "" && user.email != "" && user.password != "") ? <Login userData={user} submitLogin={submitLogin} /> : ""}
      {(!loginSuccess) ? "" : <Home user={user}/>}
    </div>
  );
}

export default App;
