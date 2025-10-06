import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function ScreensIndex() {
  const screens = [
    { path: 'cafe-1-6', name: 'Cafe Screen' },
    { path: 'home-1-3', name: 'Home Screen' },
    { path: 'notes-8-3', name: 'Notes Screen' },
    { path: 'mappin-207-42', name: 'Map Pin Icon' },
    { path: 'coffee-app-8-21', name: 'Coffee Shop App' }
  ];

  return (
    <div className="screens-index">
      <h1>Available Screens</h1>
      <nav>
        {screens.map(screen => (
          <Link 
            key={screen.path}
            to={`/screens/${screen.path}`}
            style={{
              display: 'block',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            {screen.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default ScreensIndex;
