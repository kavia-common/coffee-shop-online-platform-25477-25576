import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ScreenLoader from './components/ScreenLoader';
import ScreensIndex from './screens/ScreensIndex';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div>
        <header style={{
          padding: '1rem',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <Link to="/screens" style={{
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}>
            Screen Index
          </Link>
        </header>
        
        <Routes>
          <Route path="/" element={<Navigate to="/screens" replace />} />
          <Route path="/screens" element={<ScreensIndex />} />
          <Route path="/screens/cafe-screen-1-6" element={<ScreenLoader htmlFile="cafe-screen-1-6.html" />} />
          <Route path="/screens/home-screen-1-3" element={<ScreenLoader htmlFile="home-screen-1-3.html" />} />
          <Route path="/screens/mappin-207-42" element={<ScreenLoader htmlFile="mappin-207-42.html" />} />
          <Route path="/screens/notes-delete-after-reading-8-3" element={<ScreenLoader htmlFile="notes-delete-after-reading-8-3.html" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
