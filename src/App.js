import React, { useState } from 'react';
import LoginForm from "./Components/LoginForm";
import Dashboard from './Components/Dashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const [auth, setAuth] = useState(false);

  return (
   <div>
    
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={auth ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
        <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/login" />} />
        
       
       
      </Routes>
    </Router>
   </div>
  );
}

export default App;
