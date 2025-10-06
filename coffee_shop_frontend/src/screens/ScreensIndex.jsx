import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function ScreensIndex() {
  const screens = [
    { path: 'cafe', name: 'Cafe Details', description: 'View detailed coffee shop information' },
    { path: 'home', name: 'Home', description: 'Browse coffee shops near you' },
    { path: 'notes', name: 'Notes', description: 'Application notes and credits' },
    { path: 'mappin', name: 'Map Pin', description: 'Location marker component' },
    { path: 'coffee-app', name: 'Coffee Shop App', description: 'Main application view' }
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
