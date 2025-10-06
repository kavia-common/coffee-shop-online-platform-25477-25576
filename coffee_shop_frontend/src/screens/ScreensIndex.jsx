import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * ScreensIndex component that displays links to all available screens.
 * Assets are served from /public/assets/ directory with the following structure:
 * - HTML files: /assets/*.html
 * - CSS files: /assets/*.css
 * - JavaScript files: /assets/*.js
 * - Images: /assets/figmaimages/*
 */
function ScreensIndex() {
  const screens = [
    { path: 'cafe-screen-1-6', name: 'Cafe Details', description: 'View detailed coffee shop information' },
    { path: 'home-screen-1-3', name: 'Home', description: 'Browse coffee shops near you' },
    { path: 'notes-delete-after-reading-8-3', name: 'Notes', description: 'Application notes and credits' },
    { path: 'mappin-207-42', name: 'Map Pin', description: 'Location marker component' },
    { path: 'coffee-shop-app-8-21', name: 'Coffee Shop App', description: 'Main application view with splash screen' }
  ];

  const cardStyle = {
    display: 'block',
    padding: '1.5rem',
    backgroundColor: 'var(--theme-surface)',
    color: 'var(--theme-text)',
    textDecoration: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid var(--theme-primary)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const hoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 12px rgba(0,0,0,0.15)'
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        color: 'var(--theme-text)',
        marginBottom: '2rem',
        textAlign: 'center',
        fontSize: '2.5rem'
      }}>Coffee Shop Screens</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '1rem'
      }}>
        {screens.map(screen => (
          <Link 
            key={screen.path}
            to={`/screens/${screen.path}`}
            style={cardStyle}
            onMouseEnter={e => {
              Object.assign(e.currentTarget.style, hoverStyle);
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <h2 style={{ 
              margin: '0 0 1rem 0',
              color: 'var(--theme-primary)',
              fontSize: '1.5rem'
            }}>{screen.name}</h2>
            <p style={{ 
              margin: 0,
              color: 'var(--theme-text)',
              opacity: 0.8,
              fontSize: '1rem',
              lineHeight: 1.5
            }}>{screen.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ScreensIndex;
