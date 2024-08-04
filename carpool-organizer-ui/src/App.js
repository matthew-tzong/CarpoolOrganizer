import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import CarpoolManagement from './components/CarpoolManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/carpools" element={<CarpoolManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
