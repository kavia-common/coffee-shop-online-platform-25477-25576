import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScreenLoader from './components/ScreenLoader';
import ScreensIndex from './screens/ScreensIndex';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/screens" replace />} />
        <Route path="/screens" element={<ScreensIndex />} />
        <Route path="/screens/cafe-1-6" element={<ScreenLoader screenName="cafe-screen-1-6" />} />
        <Route path="/screens/home-1-3" element={<ScreenLoader screenName="home-screen-1-3" />} />
        <Route path="/screens/notes-8-3" element={<ScreenLoader screenName="notes-delete-after-reading-8-3" />} />
        <Route path="/screens/mappin-207-42" element={<ScreenLoader screenName="mappin-207-42" />} />
        <Route path="/screens/coffee-app-8-21" element={<ScreenLoader screenName="coffee-shop-app-8-21" />} />
      </Routes>
    </Router>
  );
}

export default App;
