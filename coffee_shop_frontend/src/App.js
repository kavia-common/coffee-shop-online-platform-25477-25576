import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import ScreenLoader from './components/ScreenLoader';
import ScreensIndex from './screens/ScreensIndex';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="App">
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
            color: '#fff',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            background: 'var(--theme-primary)',
            transition: 'opacity 0.2s',
            fontWeight: '600'
          }}>
            View All Screens
          </Link>
        </header>
        
        <Routes>
          <Route path="/" element={<Navigate to="/screens" replace />} />
          <Route path="/screens" element={<ScreensIndex />} />
          <Route path="/screens/cafe" element={<ScreenLoader htmlFile="cafe-screen-1-6.html" />} />
          <Route path="/screens/home" element={<ScreenLoader htmlFile="home-screen-1-3.html" />} />
          <Route path="/screens/notes" element={<ScreenLoader htmlFile="notes-delete-after-reading-8-3.html" />} />
          <Route path="/screens/mappin" element={<ScreenLoader htmlFile="mappin-207-42.html" />} />
          <Route path="/screens/coffee-app" element={<ScreenLoader htmlFile="coffee-shop-app-8-21.html" />} />
          <Route path="*" element={
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--theme-text)'
            }}>
              <h1>Page Not Found</h1>
              <Link to="/screens" style={{
                color: 'var(--theme-primary)',
                textDecoration: 'none'
              }}>
                Return to Screens
              </Link>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
