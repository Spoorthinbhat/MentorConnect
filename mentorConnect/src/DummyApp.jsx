import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Ensure correct import
import Identity from './assets/Identity';
import Login from './assets/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/identity" element={<Identity />} />
      </Routes>
    </Router>
  );
}

export default App;
