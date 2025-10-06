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
          background: 'var(--theme-surface)',
          borderBottom: '1px solid var(--theme-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link to="/" style={{
            color: 'var(--theme-primary)',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Coffee Shop
          </Link>
          <Link to="/screens" style={{
            color: 'var(--theme-text)',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            background: 'var(--theme-primary)',
            color: '#fff'
          }}>
            View All Screens
          </Link>
        </header>
        
        <Routes>
          <Route path="/" element={<Navigate to="/screens" replace />} />
          <Route path="/screens" element={<ScreensIndex />} />
          <Route path="/screens/cafe-screen-1-6" element={<ScreenLoader htmlFile="cafe-screen-1-6.html" />} />
          <Route path="/screens/home-screen-1-3" element={<ScreenLoader htmlFile="home-screen-1-3.html" />} />
          <Route path="/screens/mappin-207-42" element={<ScreenLoader htmlFile="mappin-207-42.html" />} />
          <Route path="/screens/notes-delete-after-reading-8-3" element={<ScreenLoader htmlFile="notes-delete-after-reading-8-3.html" />} />
          <Route path="/screens/coffee-shop-app-8-21" element={<ScreenLoader htmlFile="coffee-shop-app-8-21.html" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
