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
        {/* Cafe screen - displays detailed coffee shop view */}
        <Route path="/screens/cafe" element={<ScreenLoader screenName="cafe-screen-1-6" />} />
        
        {/* Home screen - main landing page with coffee shop listings */}
        <Route path="/screens/home" element={<ScreenLoader screenName="home-screen-1-3" />} />
        
        {/* Notes screen - displays application notes */}
        <Route path="/screens/notes" element={<ScreenLoader screenName="notes-delete-after-reading-8-3" />} />
        
        {/* Map pin icon screen - displays map location marker */}
        <Route path="/screens/mappin" element={<ScreenLoader screenName="mappin-207-42" />} />
        
        {/* Coffee app screen - main application screen */}
        <Route path="/screens/coffee-app" element={<ScreenLoader screenName="coffee-shop-app-8-21" />} />
      </Routes>
    </Router>
  );
}

export default App;
